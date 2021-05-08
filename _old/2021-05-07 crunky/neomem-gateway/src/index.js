// manage data for this datasource - folders and other datasources.

//. handle datasource registry also - put/post/delete datasources.

import fetch from 'node-fetch'
import { Query, Projection, Path } from 'neomem-util'
import { Root } from './root.js'
import { Meta } from './meta.js'

let nmdata = null

/**
 * Get an item or items.
 * @param {Query} query
 * @param {Object} item?  //. {Item}
 * @returns {Promise<Object>} //. {Item|Item[]}
 */
//. recurse or loop with stack to handle folders etc
//. extract this code and nmdata-bookmarks / filesys to a functional,
//  ie pass in points of difference, get a 'get' function out.
async function get(query, item = nmdata) {
  // get metadata
  if (query.params.meta === 1) {
    const metadata = Meta.get()
    return metadata
  }

  // get root item, memoized
  if (nmdata === null) {
    nmdata = await Root.get()
    item = nmdata
  }

  // get query parts
  const { first, rest } = Path.split(query.params.path)
  const fields = query.params.fields || ''

  // get ONE item
  if (item.name === first && rest === '' && query.params.depth === 0) {
    return Projection.make(item, fields)
  }

  // look for path in child items
  const child = item.children.find(i => i.name === first)

  // get root item
  if (!child && first === '' && rest === '' && query.params.depth === 0) {
    return Projection.make(item, fields)
  }

  // pass query along to other datasource if needed
  if (child && child.type === 'datasource') {
    const url = query.getRemainingUrl(child)
    const response = await fetch(url)
    const json = await response.json()
    return json
  }

  // return projection of child items
  return item.children.map(i => Projection.make(i, fields))
}

async function post(query) {}
async function put(query) {}
async function del(query) {}

const Data = { get, post, put, del }

export { Data }
