// data
// manage data for this datasource - folders and other datasources

const fetch = require('node-fetch')

//. hardcode these for now - eventually want a registry of plugins
//. query each item for description, nitems, etc, if requested?
const items = [
  { name: 'neo4j', type: 'datasource', url: 'http://localhost:4001' },
  { name: 'filesys', type: 'datasource', url: 'http://localhost:4002' },
  { name: 'bookmarks', type: 'datasource', url: 'http://localhost:4003' },
]

// the root data item
const root = {
  name: 'neomem-data',
  type: 'datasource',
  description: 'a federated data source',
  children: items,
}

async function get(query, start = root) {
  const items = start.children
  const item = items.find(item => item.name === query.firstOfPath)
  if (item && item.type === 'datasource') {
    // pass query along to other datasource
    const url =
      item.url + '/api/v1/' + query.restOfPath + '?' + query.paramsString
    const response = await fetch(url)
    const json = response.json()
    return json
  }
  if (Number(query.params.depth) === 0) {
    return getProjection(start, query) // get ONE item
  }
  return items.map(item => getProjection(item, query))
}

function getProjection(item, query) {
  const projection = {}
  query.params.fields.forEach(field => (projection[field] = item[field]))
  return projection
}

module.exports = { get }