const querystring = require('querystring') // node lib https://nodejs.org/api/querystring.html
const { Path } = require('./path')

function make(url = '') {
  const path = Path.make(url)
  const paramsString = url.split('?')[1] || ''
  const params = querystring.parse(paramsString)
  const query = {
    path,
    url,
    params,
    paramsString,
  }
  return query
}

// parse an http request url into a query object.
// request is { params.path, raw.req.url }
// eg with url = 'localhost:4003/api/v1/books/scifi?fields=name,type&sortby=name'
// and path = '/books/scifi'
// returns a query object like
// {
//   params: {
//     fields: ['name', 'type'],
//     sortby: 'name',
//   },
//   path: { string: 'books/scifi', ... },
//   url: 'localhost:4003/api/v1/books/scifi?fields=name,type&sortby=name',
// }
function makeFromRequest(request) {
  const path = Path.make(request.params.path)
  const url = request.raw.req.url // eg 'localhost:4003/books/scifi?fields=name,type&sortby=name'
  const urlParams = url.split('?')[1] // eg 'fields=name,type&sortby=name'

  // get param object and string
  // note: querystring lib returns a string if one value, an array if >1
  const requestParams = querystring.parse(urlParams) // eg { fields: ['name','type'], sortby: 'name' }
  const defaultParams = {
    fields: 'name,type,description'.split(','),
    depth: 1,
    // sortby: '',
    // where: '',
    // follow: '', // 'children',
    // offset: 0,
    // limit: 20,
    // q: '',
  }
  const params = { ...defaultParams, ...requestParams }
  const paramsString = querystring.stringify(params).replace(/%2C/g, ',')

  const query = {
    path,
    url,
    params,
    paramsString,
  }
  return query
}

const Query = {
  make,
  makeFromRequest,
}

module.exports = { Query }
