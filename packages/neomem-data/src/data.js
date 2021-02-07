const fetch = require('node-fetch')

// hardcode these for now - eventually want a registry of plugins
//. query each node for description, nitems, etc, if requested?
const nodes = [
  { name: 'neo4j', type: 'datasource', url: 'http://localhost:4001' },
  { name: 'filesys', type: 'datasource', url: 'http://localhost:4002' },
  { name: 'bookmarks', type: 'datasource', url: 'http://localhost:4003' },
]

const root = {
  name: 'neomem-data',
  type: 'datasource',
  description: 'a federated data source',
  children: nodes,
}

async function get(root, query) {
  // const first = query.pathArray[0] // eg 'bookmarks'
  // const rest = query.pathArray.slice(1).join('/') // eg 'books/scifi'
  const node = nodes.find(node => node.name === query.pathFirst)
  if (node && node.type === 'datasource') {
    // pass query along to other datasource
    const url =
      node.url + '/api/v1/' + query.pathRest + '?' + query.paramsString
    const response = await fetch(url)
    const json = response.json()
    return json
  }
  if (Number(query.params.depth) === 0) {
    return getProjection(root, query)
  }
  return nodes.map(node => getProjection(node, query))
}

function getProjection(node, query) {
  const projection = {}
  query.params.fields.forEach(field => (projection[field] = node[field]))
  return projection
}

module.exports = { get }
