const querystring = require('querystring') // node lib https://nodejs.org/api/querystring.html
const pathLib = require('path') // node lib https://nodejs.org/api/path.html

// get absolute path from names and current absolute location.
// eg names = 'books/scif', location = '/bookmarks'
// returns '/bookmarks/books/scifi'
function getPath(names, location) {
  const dest = names || ''
  const path = dest.startsWith('/')
    ? dest
    : dest
    ? pathLib.join(location, dest)
    : location
  return path
}

// parse an http request url.
// returns an object with the encoded query.
// request is { params.path, raw.req.url }
// eg for url = 'localhost:4003/api/v1/books/scifi?fields=name,type&sortby=name'
// returns a query object like
// {
//   path: 'books/scifi',
//   pathArray: ['books', 'scifi']
//   fields: 'name' or ['name', 'type'],
//   sortby: 'name' or ['year', 'name']
// }
function getQuery(request) {
  const path = request.params.path || '' // eg 'books/scifi'
  const url = request.raw.req.url // eg 'localhost:4003/books/scifi?fields=name,type&sortby=name'
  const params = url.split('?')[1] // eg 'fields=name,type&sortby=name'
  // querystring lib returns a string if one value, an array if >1
  const paramsDict = querystring.parse(params) // eg { fields: ['name','type'], sortby: 'name' }
  const defaults = {
    path,
    fields: 'name,type,description'.split(','),
    sortby: '',
    where: '',
    follow: '', // 'children',
    offset: 0,
    limit: 20,
    depth: 1,
    q: '',
  }
  const query = { ...defaults, ...paramsDict }
  //.?
  if (path.endsWith('/')) {
    query.depth = 0
  }
  console.log('url:', url)
  console.log('query object:', query)
  query.string = querystring.stringify(query)
  query.pathArray = path.split('/')
  query.url = url
  return query
}

module.exports = { getPath, getQuery }
