const querystring = require('querystring') // node lib https://nodejs.org/api/querystring.html

// parse an http request url
// returns an object with the encoded query
module.exports = function getQuery(request) {
  const url = request.raw.req.url // eg 'localhost:4003/books/scifi?fields=name,type&sortby=name'
  const path = request.params.path // eg 'books/scifi'
  const params = url.split('?').slice(1)[0] // eg 'fields=name,type&sortby=name'
  const queryParts = querystring.parse(params) // eg { fields: ['name','type'], sortby: 'name' }
  const defaults = {
    path: '',
    fields: 'name,type,description'.split(','),
    sortby: 'name',
    // follow: 'children',
    follow: '',
    offset: 0,
    limit: 20,
    where: '',
    q: '',
  }
  const query = {
    ...defaults,
    ...queryParts,
    path: (path || defaults.path).split('/'),
    fields: queryParts.fields || defaults.fields,
    sortby: queryParts.sortby || defaults.sortby,
  }
  console.log('query object:', query)
  return query
}
