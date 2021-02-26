// manage data for this datasource - folders and other datasources.

//. handle datasource registry also - put/post/delete datasources.

const fetch = require('node-fetch').default
const { Query, Projection, Path } = require('neomem-util')
const { Root } = require('./root')
const { Meta } = require('./meta')

let nmdata = null

/**
 * Get an item or items.
 * @param query {Query}
 * @param start? {Object} //. Item
 * @returns {Promise<Object>}
 */
//. recurse or loop with stack to handle folders etc
//. extract this code and nmdata-bookmarks to a functional,
//  ie pass in points of difference, get a 'get' function out.
async function get(query, start = nmdata) {
  // get metadata
  if (query.params.meta === 1) {
    const metadata = Meta.get()
    return metadata
  }

  // get root item, memoized
  if (nmdata === null) {
    nmdata = await Root.get()
    start = nmdata
  }

  // get query parts
  const { first, rest } = Path.split(query.params.path)
  const fields = query.params.fields || ''

  // get ONE item
  if (start.name === first && rest === '' && query.params.depth === 0) {
    return Projection.make(start, fields)
  }

  // look for path in child items
  const child = start.children.find(i => i.name === first)

  // get root item
  if (!child && first === '' && rest === '' && query.params.depth === 0) {
    return Projection.make(start, fields)
  }

  // pass query along to other datasource if needed
  if (child && child.type === 'datasource') {
    const url = query.getRemainingUrl(child)
    const response = await fetch(url)
    const json = await response.json()
    return json
  }

  // return projection of child items
  return start.children.map(i => Projection.make(i, fields))
}

async function post(query) {}
async function put(query) {}
async function del(query) {}

const Data = { get, post, put, del }

module.exports = { Data }
