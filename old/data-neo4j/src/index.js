import neo4j from 'neo4j-driver' // official neo4j js driver
// import utils from '@neomem/utils'



class NeomemSourceNeo4j {

  constructor() {
    this.name = 'neo4j'
    this.driver = null
  }

  async open({ uri, user, password }={}) {
    console.log("Initialize neo4j driver", uri)
    // note: neo4j stores 64-bit ints, js only goes up to 53-bits (9e16)
    // see https://github.com/neo4j/neo4j-javascript-driver#enabling-native-numbers
    this.driver = neo4j.driver(uri, neo4j.auth.basic(user, password), { disableLosslessIntegers: true })
  }
  
  async close() {
    console.log("Close neo4j driver")
    await this.driver.close()
  }


  async runQuery(queryTemplate, queryParams={}) {
    const query = utils.fillInTemplate(queryTemplate, queryParams)
    const session = this.driver.session()
    let result
    try {
      // console.log('run', query, queryParams)
      result = await session.run(query, queryParams)
    } catch(error) {
      console.error(error)
    } finally {
      session.close()
    }
    // always return nodes array, even if empty
    let nodes = []
    if (result && result.records) {
      nodes = result.records.map(record=>record.get('node')).filter(node=>!!node)
    }
    return { nodes }
  }

  // ------------------------------------------------------------------

  // api - crud operations - add, get, set, delete

  async add(params={}) {
    let name, type
    if (params.path) {
      [name, type] = utils.getLastNameTypeFromPath(params.path)
    } else {
      name = params.name
      type = params.type
    }
    const optionalType = utils.getOptionalType(type)
    //. check for existing one first, abort with error msg if there
    const queryTemplate = `
    CREATE (node:Node#optionalType# {name: $name})
    SET node.created=datetime()
    SET node.modified=datetime()
    SET node.uuid=randomUUID()
    WITH node, labels(node) as type
    RETURN node { .*, type }
    `
    const queryParams = { name, optionalType }
    const { nodes } = await this.runQuery(queryTemplate, queryParams)
    const node = nodes[0]

    // optionally add link to a parent node
    const { parentUuid } = params
    if (parentUuid) {
      const { uuid } = node
      const queryTemplate2 = `
      MATCH (parent), (node)
      WHERE parent.uuid=$parentUuid AND node.uuid=$uuid
      CREATE (parent)-[r:CHILD]->(node)
      RETURN node { .* }
      `
      const queryParams2 = { parentUuid, uuid }
      const { nodes:nodes2 } = await this.runQuery(queryTemplate2, queryParams2)
      const node2 = nodes2[0]
      return { node2:node }
      // console.log(nodes)
      // ui.display(`Added ${type} ${name} to pokpok.`)
    } else {
      // //. optionally add link to inbox?
      // const queryTemplate2 = `
      // MATCH (inbox:Folder {name: 'inbox'}), (node)
      // WHERE id(node)=$id
      // CREATE (inbox)-[r:CHILD]->(node)
      // RETURN r
      // `
      // const queryParams2 = { id }
      // ui.display(`Added ${type} ${name} to inbox.`)
    }
    return { node }
  }
  

  async delete(params={}) {
    const { path, uuid } = params

    if (path) {

      //. check for single node, disambiguate if necessary?
      //. or confirm multiple deletion?

      // ui.display(`Will look for item(s) named "${name}", disambiguate if necessary, and confirm deletion.`)
      const [name, type] = utils.getLastNameTypeFromPath(path)
      const optionalType = utils.getOptionalType(type)
      const queryTemplate = `
      MATCH (node:Node#optionalType# {name: $name})
      DETACH DELETE node
      RETURN node { .* }
      `
      const queryParams = { name, optionalType }
      const { nodes } = await this.runQuery(queryTemplate, queryParams)
      const node = nodes[0]
      // ui.display(`Deleted ${type} ${node.name}.`)
      return { node }

    } else if (uuid) {

      const queryTemplate = `
      MATCH (node)
      WHERE node.uuid=$uuid
      DETACH DELETE node
      `
      const queryParams = { uuid }
      const { nodes } = await this.runQuery(queryTemplate, queryParams)
      const node = nodes[0]
      return { node }
    }
  }


  //. handle recursion
  async get(params={ maxDepth: 1 }) { // path: 'home:folder' //. put default here?
    
    if (params.uuid) {
    
      const queryTemplate = `
      MATCH (node) 
      WHERE node.uuid=$uuid
      WITH node, labels(node) as type
      RETURN node { .*, type }
      `
      const queryParams = { uuid: params.uuid }
      const { nodes } = await this.runQuery(queryTemplate, queryParams)
      // const types = nodes.map(row => row.type.join('+')) //. ?
      return { nodes }

    } else if (params.path) {
    
      const queryTemplate = `
      MATCH (node#optionalType# {name: $name}) 
      WITH node, labels(node) as type
      RETURN node { .*, type }
      `
      const path = params.path
      const [name, type] = utils.getLastNameTypeFromPath(path)
      const optionalType = utils.getOptionalType(type)
      const queryParams = { name, optionalType }
      const { nodes } = await this.runQuery(queryTemplate, queryParams)
      return { nodes }
    
    } else if (params.parentPath) {
    
      const queryTemplate = `
      MATCH (location#optionalType# { name: $name }) 
      OPTIONAL MATCH (location)-[]->(node)
      OPTIONAL MATCH (node)-[]->(grandchild)
      WITH node, labels(node) as type, count(grandchild)>0 as hasChildren
      RETURN node { .*, type, hasChildren }
      `
      const parentPath = params.parentPath
      const [name, type] = utils.getLastNameTypeFromPath(parentPath)
      const optionalType = utils.getOptionalType(type)
      const queryParams = { name, optionalType }
      const { nodes } = await this.runQuery(queryTemplate, queryParams)
      return { nodes }
    
    } else if (params.parentUuid) {
      
      const queryTemplate = `
      MATCH (location)
      WHERE location.uuid=$uuid 
      OPTIONAL MATCH (location)-[]->(node)
      OPTIONAL MATCH (node)-[]->(grandchild)
      WITH node, labels(node) as type, count(grandchild)>0 as hasChildren
      RETURN node { .*, type, hasChildren }
      `
      const parentUuid = params.parentUuid
      const queryParams = { uuid: parentUuid }
      const { nodes } = await this.runQuery(queryTemplate, queryParams)
      return { nodes }

    }
  }

  //. recursion stuff

  // async getNodes({ path, uuid }={}) {
  //   nodes = nodes.filter(row => !!row) // if no children, returns [ null ], so filter that out
  //   nodes.forEach(row => row.type = row.type.join('+').toLowerCase()) // type is an array
  //   // recurse down each row as needed, assigning children to _children
  //   for (const row of nodes) {
  //     //. escape path with `` where needed
  //     // row.path = (path ? path + '/' : '') + row.name + ':' + row.type
  //     row.path = row.name + ':' + row.type
  //     // recurse if needed
  //     if (maxDepth>0 && row.hasChildren) {
  //       const children = await execute({
  //         uuid: row.uuid,
  //         maxDepth: maxDepth - 1, 
  //       })
  //       row._children = children
  //     }
  //   }
  //   const start = { noun, params }
  //   async function getRecurse({ noun, params }=start) {
  //     // const params = { uuid }
  //     let nodes = await this.runQuery('list', params) // fetch data
  //     nodes = nodes.filter(row => !!row) // if no children, returns [ null ], so filter that out
  //     nodes.forEach(row => row.type = row.type.join('+').toLowerCase()) // type is an array
  //     // recurse down each row as needed, assigning children to _children
  //     for (const row of nodes) {
  //       //. escape path with `` where needed
  //       // row.path = (path ? path + '/' : '') + row.name + ':' + row.type
  //       row.path = row.name + ':' + row.type
  //       // recurse if needed
  //       if (maxDepth>0 && row.hasChildren) {
  //         const children = await getRecurse({
  //           uuid: row.uuid,
  //           maxDepth: maxDepth - 1, 
  //         })
  //         row._children = children
  //       }
  //     }
  //     return nodes      
  //   }
  // }


  //. will need to handle different property types - type/label, standard, reln
  async set(params={}) {
    const { uuid } = params
    const queryParams = { uuid }
    
    // get setclause
    const rows = []
    let i = 0
    for (const key of Object.keys(params)) { // eg 'name'
      if (key!=='uuid') {
        const value = params[key] // eg 'plecy2'
        const row = `SET node.\`${key}\`=$value${i}` // eg 'SET node.`name`=$value0'
        queryParams['value'+i] = value // eg queryParams.value0 = 'plecy2'
        rows.push(row)
        i += 1
      }
    }
    const setclause = rows.join('\n')

    const queryTemplate = `
    MATCH (node)
    WHERE node.uuid=$uuid
    ${setclause}
    SET node.modified=datetime()
    RETURN node { .* }
    `
    const { nodes } = await this.runQuery(queryTemplate, queryParams)
    // return `Added ${type} ${node.name}.`
    return { nodes }
  }
}


// factory
// export default function makeSource() {
//   return new NeomemSourceNeo4j()
// }

// singleton
export default new NeomemSourceNeo4j()
