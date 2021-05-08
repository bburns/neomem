import fs from 'fs' // node lib - https://nodejs.org/api/fs.html
import util from 'neomem-util'
import sample from './sample.js'

const datasource = {}

// const rootpath = '/Users/bburns/Desktop/'

// fs.readdirSync(path[, options])

const root = {
  name: 'filesys',
  type: 'datasource',
  description: 'Datasource for filesystem',
  children: sample,
}

// given an item and a query object, return related items.
async function get(query, start = root) {
  // cdr down the path
  const first = query.pathArray[0] // eg 'books'
  const rest = query.pathArray.slice(1) // eg ['scifi']
  // check if reached the end of recursion
  if (!first) {
    if (Number(query.depth) === 0) {
      return util.getProjection(start, query) // return ONE item
    }
    const items = start.children.map(item => util.getProjection(item, query))
    return items
  }
  const item2 = start.children.find(child => child.name === first)
  return get({ ...query, pathArray: rest }, item2) // recurse
}

export default datasource
