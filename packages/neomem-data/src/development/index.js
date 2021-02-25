// manage data for this datasource - folders and other datasources.

//. handle datasource registry also - put/post/delete datasources.

const fetch = require('node-fetch').default
const { Query, Projection, Path } = require('neomem-util')
const { Root } = require('./root')
const { Meta } = require('./meta')
const { Types } = require('./types')

/**
 * Get an item or items.
 * @param query {Query}
 * @param start? {Object} //. Item
 * @returns {Promise<Object>}
 */
//. recurse or loop with stack to handle folders etc
//. extract this code and nmdata-bookmarks to a functional,
//  ie pass in points of difference, get a 'get' function out.
async function get(query, start = undefined) {
  if (query.params.meta) {
    return Meta.get()
  }

  if (start === undefined) {
    start = await Root.get() // memoized fn
  }

  const fields = query.params.fields || ''

  if (query.params.depth === 0) {
    console.log(31, start, fields)
    return Projection.make(start, fields) // get ONE item
  }

  const items = start.children
  const first = Path.getFirst(query.params.path)
  console.log(38, 'first', first)
  const item = items.find(item => item.name === first)

  // pass query along to other datasource if needed
  if (item && item.type === 'datasource') {
    const url = query.getRemainingUrl(item)
    console.log(40, url)
    const response = await fetch(url)
    const json = await response.json()
    console.log(43, json)
    return json
  }

  // return projection of items
  return items.map(item => Projection.make(item, fields))
}

async function post(query) {}
async function put(query) {}
async function del(query) {}

const Data = { get, post, put, del }

module.exports = { Data }
