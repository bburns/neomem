// manage data for this datasource - folders and other datasources.

//. handle datasource registry also - put/post/delete datasources.

const fetch = require('node-fetch').default
const { Query, Projection } = require('neomem-util')
const { Root } = require('./root')
const { Meta } = require('./meta')
const { Types } = require('./types')

// used as default query for all fns
const emptyQuery = Query.makeFromRequest()

// get an item or items
//. recurse or loop with stack to handle folders etc
async function get(query = emptyQuery, start = undefined) {
  if (query.meta) {
    return Meta.get()
  }

  if (start === undefined) {
    start = await Root.get() // memoized fn
  }

  if (query.depth === 0) {
    return Projection.make(start, query.fields) // get ONE item
  }

  const items = start.children
  const item = items.find(item => item.name === query.first)

  // pass query along to other datasource if needed
  if (item && item.type === 'datasource') {
    const url = query.getRemainingUrl(item)
    const response = await fetch(url)
    const json = await response.json()
    return json
  }

  // return projection of items
  return items.map(item => Projection.make(item, query.fields))
}

async function post(query = emptyQuery) {}
async function put(query = emptyQuery) {}
async function del(query = emptyQuery) {}

const Data = { get, post, put, del }

module.exports = { Data }
