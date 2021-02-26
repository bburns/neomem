// data get, post, put, delete handlers

const { Projection, Path } = require('neomem-util')
const { Root } = require('./root')
const { Meta } = require('./meta')

/** @typedef {import('../../neomem-util').Query} Query */

let bookmarks = null

/**
 * Get items related to the given item using the query object.
 * @param query {Query}
 * @param item {Object} //. {Item}
 * @returns {Promise<Array|Object>}
 */
async function get(query, item = bookmarks) {
  // get metadata
  if (query.params.meta === 1) {
    const metadata = Meta.get()
    return metadata
  }

  // get memoized bookmarks file
  if (bookmarks === null) {
    bookmarks = await Root.get()
    item = bookmarks
  }

  // get parts of query
  const first = Path.getFirst(query.params.path)
  const rest = Path.getRest(query.params.path)
  //. combine those?
  // const { first, rest } = Path.getParts(query.params.path)
  // const { first, rest, fields } = query.getParts() //?
  console.log({ first, rest })

  const fields = query.params.fields || ''

  // check if reached the end of recursion
  if (!first) {
    // get ONE item
    if (query.params.depth === 0) {
      const projection = Projection.make(item, fields)
      return projection
    }

    // return children
    const items = item.children
      //. .slice(query.offset, query.offset + query.limit)
      //. .filter(item => item.name.includes(query.q) || item.url.includes(query.q))
      .map(ch => Projection.make(ch, fields))
    return items
  }

  // look for path in child items
  const child = item.children.find(ch => ch.name === first)

  // recurse through children
  return get(query.getReducedQuery(), child)
}

const Data = {
  get,
}

module.exports = { Data }
