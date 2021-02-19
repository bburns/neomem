// manage data for this datasource - folders and other datasources.

//. handle datasource registry also - put/post/delete datasources.

const fetch = require('node-fetch').default
const { Query, Projection } = require('neomem-util')
const { Root } = require('./root')
const { Meta } = require('./meta')
const { Types } = require('./types')

// // used as default query for all fns
// const emptyQuery = Query.makeFromRequest()

/** get an item or items
 * @param query {Query}
 * @param start? {Object}
 * //. recurse or loop with stack to handle folders etc
 */
async function get(query, start = undefined) {
  if (query.isMeta) {
    return Meta.get()
  }

  if (start === undefined) {
    start = await Root.get() // memoized fn
  }

  // const depth = query.paramsObj.get('depth')
  if (query.paramsObj.get('depth') === '0') {
    return Projection.make(start, query.paramsObj.get('fields')) // get ONE item
  }

  const items = start.children
  console.log('items', items)
  const item = items.find(item => item.name === query.pathObj.first)

  // pass query along to other datasource if needed
  if (item && item.type === 'datasource') {
    const url = query.getUrlRemaining(item)
    const response = await fetch(url)
    const json = await response.json()
    return json
  }

  // return items

  // return projection of items
  return items.map(item => Projection.make(item, query.paramsObj.get('fields')))
}

async function post(query) {}
async function put(query) {}
async function del(query) {}

const Data = { get, post, put, del }

module.exports = { Data }
