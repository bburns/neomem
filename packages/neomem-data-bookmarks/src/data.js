const { Projection } = require('neomem-util')
const { Root } = require('./root')
const { Meta } = require('./meta')

/** @typedef {import('../../neomem-util').Query} Query */

/**
 * Get items related to the given item using the query object.
 * @param query {Query}
 * @param start {Object} //. an Item
 */
async function get(query, start = undefined) {
  if (query.isMeta) {
    return Meta.get().view
  }

  if (start === undefined) {
    start = await Root.get() // memoized bookmarks file
  }

  const first = query.pathObj.first

  const fields = query.paramsObj.get('fields')

  // check if reached the end of recursion
  if (!first) {
    if (query.paramsObj.get('depth') === '0') {
      // return getProjection(start, query) // return ONE item
      const projection = Projection.make(start, fields)
      return projection
    }
    const items = start.children
      // .slice(query.offset, query.offset + query.limit)
      // .filter(item => item.name.includes(query.q) || item.url.includes(query.q))
      // .map(item => getProjection(item, query))
      .map(item => Projection.make(item, fields))
    return items
  }
  const item2 = start.children.find(child => child.name === first)
  return get(query.getReducedQuery(), item2) // recurse
}

module.exports = { get }
