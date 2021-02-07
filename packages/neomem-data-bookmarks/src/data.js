const fs = require('fs') // node lib
const util = require('neomem-util')

//. get user's folder - need node lib
// const chromePath = '/Users/bburns/Library/Application Support/Google/Chrome/Default/Bookmarks'

// note: can read and parse json file directly using require,
// but only works for files with .json extension -
// otherwise it thinks it's javascript.
// see https://stackoverflow.com/a/36591002/243392
// const examplePath = __dirname + '/../test/fixtures/example.json'
// const path = options.use === 'chrome' ? chromePath : examplePath
// console.log(`Reading ${path}...`)
const path = __dirname + '/example.json' // a smaller example file
let bookmarks

const root = {
  name: 'bookmarks',
  type: 'datasource',
  description: 'Datasource for Chrome bookmarks. Read-only for now.',
  // children: Object.values(bookmarks.roots),
}

// given an item and a query object, return related items.
async function get(query, start = root) {
  // memoize the bookmarks file
  if (!root.children) {
    bookmarks = JSON.parse(fs.readFileSync(path, 'utf-8'))
    root.children = Object.values(bookmarks.roots)
  }
  // cdr down the path
  const first = query.pathArray[0] // eg 'books'
  const rest = query.pathArray.slice(1) // eg ['scifi']
  // check if reached the end of recursion
  if (!first) {
    if (Number(query.depth) === 0) {
      return getProjection(start, query) // return ONE item
    }
    const items = start.children
      // .slice(query.offset, query.offset + query.limit)
      // .filter(item => item.name.includes(query.q) || item.url.includes(query.q))
      .map(item => getProjection(item, query))
    return items
  }
  const item2 = start.children.find(child => child.name === first)
  return get({ ...query, pathArray: rest }, item2) // recurse
}

// project an item's data into the query's required fields.
function getProjection(item, query) {
  const projection = {}
  query.fields.forEach(field => {
    // convert chrome dates to iso dates here
    if (field === 'created') {
      projection[field] = util.datatypes.date1601.getISODate(item.date_added)
    } else if (field === 'modified') {
      projection[field] = util.datatypes.date1601.getISODate(item.date_modified)
    } else {
      projection[field] = item[field]
    }
  })
  return projection
}

module.exports = { get }
