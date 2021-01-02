
//. merge all this into neomem-source-neo4j

//. will want to design simple query objects to translate to these cypher commands


// do a union query to include the project item at the top of the results
// MATCH (n:Project {name:$projectName})
// OPTIONAL MATCH (n)-[:TIMEFRAME]->(t:Timeframe)
// WITH n, labels(n) as type, 'self' as rels, collect(t) as timeframe,
// $projectName as project,
// id(n) as id
// RETURN n { .*, type, timeframe, project, id, rels }
// UNION
// const projectQuery = `
// MATCH (n)<-[r]-(m:Project {name:$projectName}) 
// OPTIONAL MATCH (n)-[:TIMEFRAME]->(t:Timeframe)
// OPTIONAL MATCH (n)-[:PLACE]->(place)
// WITH n, labels(n) as type, collect(r) as rels, collect(t) as timeframe, 
// $projectName as project, 
// collect(place.name) as place,
// id(n) as id
// RETURN n { .*, type, timeframe, project, id, rels, place }
// `

// use relntype as recursor
// > list projects
// > list projects with timeframe and place
// > list :project with timeframe, place
const projectQuery = `
MATCH (n)<-[r]-(m:Project {name:$projectName}) 
OPTIONAL MATCH (n)-[:TIMEFRAME]->(t:Timeframe)
OPTIONAL MATCH (n)-[:PLACE]->(place)
WITH n, labels(n) as type, type(r) as relntype, collect(t) as timeframe, 
  $projectName as project, 
  collect(place.name) as place,
  id(n) as id
RETURN n { .*, type, timeframe, project, id, relntype, place }
`

// > add task
const projectAddQuery = `
MATCH (m:Project {name:$projectName})
CREATE (n:Task)-[:PROJECT]->(m)
WITH n, labels(n) as type, id(n) as id
RETURN n { .*, type, id }
`

// > add <label>
const genericAddQuery = `
CREATE (n:#label#)
WITH n, labels(n) as type, id(n) as id
RETURN n { .*, type, id }
`
// const genericCols = "id,type,name,description"


export const facets = {
  // facets: {
  //   params: { label: 'Facet' },
  //   query: genericQuery,
  //   cols: genericCols,
  //   addQuery: genericAddQuery,
  // },

  // > list with project, timeframe, place
  all: {
    query: `
    MATCH (n) 
    OPTIONAL MATCH (n)<-[]-(p:Project)
    OPTIONAL MATCH (n)-[]->(t:Timeframe)
    OPTIONAL MATCH (n)-[]->(place:Place)
    WITH n, labels(n) as type, collect(p.name) as project, 
      collect(t) as timeframe, id(n) as id, collect(place.name) as place
    RETURN n { .*, type, project, timeframe, id, place }
    `,
    addQuery: genericAddQuery,
  },

  //. inbox should be important enough to not need fullpath
  // > list inbox with timeframe, place, project
  // > list inbox:folder
  // > list home/inbox
  inbox: {
    query: `
    MATCH (n)<-[]-(f:Folder {name:'inbox'}) 
    OPTIONAL MATCH (n)-[]->(t:Timeframe)
    OPTIONAL MATCH (n)-[]->(place:Place)
    OPTIONAL MATCH (n)<-[]-(p:Project)
    WITH n, labels(n) as type, collect(t) as timeframe,
      collect(place.name) as place, collect(p.name) as project, 
      id(n) as id
    RETURN n { .*, type, timeframe, place, project, id }
    `,
    // addQuery: genericAddQuery,
  },

  // > list projects with client, timeframe
  projects: {
    query: `
    MATCH (n:Project) 
    OPTIONAL MATCH (n)-[:CLIENT]->(c)
    OPTIONAL MATCH (n)-[:TIMEFRAME]->(t)
    WITH n, labels(n) as type, id(n) as id,
      collect(c.name) as client, 
      collect(t.name) as timeframe
    RETURN n { .*, type, id, timeframe, client }
    `,
    // > add project
    // > set its name pokpok  // best?
    // > set name pokpok  // would set name for current location? or know from context which to use?
    // > add project and select  // would be hard to remember; verbose
    addQuery: `
    CREATE (n:Project)
    WITH n, labels(n) as type, id(n) as id
    RETURN n { .*, type, id }
    `,
  },

  personal: {
    params: { projectName: "personal" },
    query: projectQuery,
    addQuery: projectAddQuery,
  },

  neomem: {
    params: { projectName: "neomem" },
    query: projectQuery,
    addQuery: projectAddQuery,
  },

  tallieo: { 
    params: { projectName: 'tallieo' }, 
    query: projectQuery, 
    addQuery: projectAddQuery,
  },

  // facemate: { params: { projectName: 'facemate' }, query: projectQuery, addQuery: projectAddQuery },

  // ccs: { params: { projectName: 'ccs' }, query: projectQuery, addQuery: projectAddQuery },

  // people: {
  //   params: { label: 'Person' },
  //   query: genericQuery,
  //   addQuery: genericAddQuery,
  // },

  // > list books and authors
  // books: {
  //   query: `
  //   MATCH (n)
  //   WHERE (n:Book) or (n:Author)
  //   OPTIONAL MATCH (n)-[r:AUTHOR]->(m)
  //   WITH n, collect(m.name) as author, labels(n) as type, id(n) as id
  //   RETURN n { .*, type, author, id }`,
  // },

  // > list all with timeframe  ?
  // > list with timeframe  ?
  timeframe: {
    query: `
    MATCH (n)-[:TIMEFRAME]->(t) 
    OPTIONAL MATCH (n)<-[]-(m:Project)
    WITH n, labels(n) AS type, collect(m.name) AS project, 
      collect(t) AS timeframe, id(n) as id
    RETURN n {.*, type, project, timeframe, id }`,
  },

  story: {
    // query: `
    // MATCH (p:Project {name: 'blt'})
    // MATCH path=(n)-[r*0..2]->(p)
    // WITH n, labels(n) as type, id(n) as id, length(path) as depth
    // RETURN n { .*, type, id, depth }
    // `,
    // > list story  // should recurse okay
    query: `
    MATCH (parent)
    WHERE id(parent)=$parentId 
    MATCH (parent)-[r1]->(n) 
    OPTIONAL MATCH path=(n)-[r2]->(grandchild)
    WITH n, r1, labels(n) as type, id(n) as id, 
      type(r1) as relntype, 
      size(collect(path))>0 as hasChildren,
      $parentId as parentId
    ORDER BY r1.order
    RETURN n { .*, type, id, relntype, hasChildren, parentId }
    `,
  },
}

