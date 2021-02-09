// manage data for this datasource - folders and other datasources.

//. handle datasource registry also - put/post/delete datasources.

const fetch = require('node-fetch')
const { Projection, Query } = require('neomem-util')
const { Root } = require('./root')
const { Meta } = require('./meta')
const { Types } = require('./types')

// get an item or items
//. recurse or loop with stack to handle folders etc
// async function get(query = {}, start = undefined) {
async function get(query = Query.make(), start = undefined) {
  if (start === undefined) {
    start = await Root.get() // memoized fn
  }
  if (query.depthZero) {
    return Projection.make(start, query, Types) // get ONE item
  }
  const items = start.children
  // const item = items.find(item => item.name === query.path.first)
  const item = items.find(item => item.name === query.first)
  if (item && item.type === 'datasource') {
    // pass query along to other datasource
    // const url = `${item.url}/api/v1/${query.path.restString}?${query.paramsString}`
    const url = query.getRemainingUrl(item)
    const response = await fetch(url)
    const json = response.json() //. no await?
    return json
  }
  return items.map(item => Projection.make(item, query, Types))
}

async function post() {}
async function put() {}
async function del() {}

const Data = { get, post, put, del }

module.exports = { Data }
