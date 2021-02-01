const querystring = require('querystring') // node lib

module.exports = function parseRequest(request) {
  const url = request.raw.req.url // eg 'localhost:4003/books/scifi?fields=name,type&sortby=name'
  const path = request.params.path // eg 'books/scifi'
  const params = url.split('?').slice(1)[0] // eg 'fields=name,type&sortby=name'
  const queryParts = querystring.parse(params) // eg { fields: 'name,type', sortby: 'name' }
  const defaults = {
    path: '',
    fields: 'name,type,description',
    sortby: 'name',
    follow: 'children',
    offset: 0,
    limit: 20,
    where: '',
    q: '',
  }
  const query = {
    ...defaults,
    ...queryParts,
    path: (path || defaults.path).split('/'),
    fields: (queryParts.fields || defaults.fields).split(','),
    sortby: (queryParts.sortby || defaults.sortby).split(','),
  }
  return query
}
