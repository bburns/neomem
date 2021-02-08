// data
// manage data for this datasource - folders and other datasources.
//. handle datasource registry also - put/post/delete datasources.

const fetch = require('node-fetch')
const { Projection } = require('neomem-util')
const root = require('./root')
const meta = require('./meta')
const types = require('./types')

// get an item or items
//. recurse or loop with stack to handle folders etc
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
    return Projection(start, query) // get ONE item
  }
  return items.map(item => Projection(item, query))
}

module.exports = { get } //. and post, put, delete
