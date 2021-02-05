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

// parse an http request url
// returns an object with the encoded query.
// request is { params.path, raw.req.url }
// where path is the part after api/v1
// eg for url = 'localhost:4003/api/v1/books/scifi?fields=name,type&sortby=name'
// returns query object like
// {
//   fields: ['name', 'type'],
//   sortby: 'name'
// }
function getQuery(request) {
  const url = request.raw.req.url // eg 'localhost:4003/books/scifi?fields=name,type&sortby=name'
  const path = request.params.path // eg 'books/scifi'
  const params = url.split('?').slice(1)[0] // eg 'fields=name,type&sortby=name'
  const queryParts = querystring.parse(params) // eg { fields: ['name','type'], sortby: 'name' }
  const defaults = {
    path: '',
    fields: 'name,type,description'.split(','),
    sortby: '', // 'name',
    where: '',
    follow: '', // 'children',
    offset: 0,
    limit: 20,
    depth: 1,
    q: '',
  }
  const query = {
    ...defaults,
    ...queryParts,
    path: (path || defaults.path).split('/'),
    // fields: queryParts.fields || defaults.fields,
    // sortby: queryParts.sortby || defaults.sortby,
  }
  //.?
  if (path.endsWith('/')) {
    query.depth = 0
  }
  console.log('url:', url)
  console.log('query object:', query)
  query.string = querystring.stringify(query)
  return query
}

module.exports = { getPath, getQuery }
