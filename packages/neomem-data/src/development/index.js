// manage data for this datasource - folders and other datasources.

//. handle datasource registry also - put/post/delete datasources.

const fetch = require('node-fetch')
const { Projection } = require('neomem-util')
const { Root } = require('./root')
// const meta = require('./meta')
const types = require('./types')

// get an item or items
//. recurse or loop with stack to handle folders etc
async function get(query, start = undefined) {
  if (start === undefined) {
    start = await Root.get() // memoized fn
  }
  if (Number(query.params.depth) === 0) {
    return Projection.make(start, query, types) // get ONE item
  }
  const items = start.children
  const item = items.find(item => item.name === query.path.first)
  if (item && item.type === 'datasource') {
    // pass query along to other datasource
    const url = `${item.url}/api/v1/${query.path.restString}?${query.paramsString}`
    const response = await fetch(url)
    const json = response.json() //. no await?
    return json
  }
  return items.map(item => Projection.make(item, query, types))
}

async function post() {}
async function put() {}
async function del() {}

const Data = {
  get,
  post,
  put,
  del,
}

module.exports = { Data }
