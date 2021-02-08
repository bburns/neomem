// data
// manage data for this datasource - folders and other datasources.
//. handle datasource registry also - put/post/delete datasources.

const fetch = require('node-fetch')
const root = require('./sample')

// get an item or items
//. recurse to handle folders etc
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

// get requested fields for the given item
function getProjection(item, query) {
  const projection = {}
  query.params.fields.forEach(field => (projection[field] = item[field]))
  return projection
}

module.exports = { get }
