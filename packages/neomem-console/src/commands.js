// define commands

//. query fields and coldefs will come from the datasource metainfo

const api = require('./api')
const Table = require('./table') // wrapper around gajus table library

async function list(tokens) {
  const type = tokens[1] || 'Node' //.
  // const query = `query { node { name, type, url, date_added, depth }}` // bookmarks
  // const query = `query { ${type} { name, notes, created, modified, depth }}` // neo4j
  const query = `query { bookmarks(subquery:"query{node{name}}")}`
  console.log(query)
  const json = await api.fetch(query)
  // console.log('json', json)
  const data = json.data.bookmarks.data //.
  // console.log('data', data)
  const nodes = data.node
  const columns = [
    {
      name: 'Name',
      accessor: obj => ' '.repeat(obj.depth) + obj.name,
      width: 36,
    },
    { name: 'Type', accessor: 'type', width: 10 },
    { name: 'Notes', accessor: 'notes', width: 20 },
    { name: 'Created', accessor: 'created', width: 18 },
    { name: 'Modified', accessor: 'modified', width: 18 },
  ]
  const t = new Table(columns, nodes)
  const s = t.toString()
  console.log(s)
  console.log('done')
}

module.exports = { list }
