// manage data for this datasource - folders and other datasources.
//. handle datasource registry also - put/post/delete datasources.

const fetch = require('node-fetch')
const { Projection } = require('neomem-util')
const { Root } = require('./root')
// const meta = require('./meta')
// const types = require('./types')

let root

// get an item or items
//. recurse or loop with stack to handle folders etc
async function get(query, start) {
  if (start === undefined) {
    start = await Root.get()
  }
  const items = start.children
  const item = items.find(item => item.name === query.firstOfPath)
  if (item && item.type === 'datasource') {
    // pass query along to other datasource
    const url =
      item.url + '/api/v1/' + query.path.restString + '?' + query.paramsString
    const response = await fetch(url)
    const json = response.json()
    return json
  }
  if (Number(query.params.depth) === 0) {
    return Projection.make(start, query) // get ONE item
  }
  return items.map(item => Projection.make(item, query))
}

module.exports = { get } //. and post, put, delete
