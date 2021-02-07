const querystring = require('querystring') // node lib https://nodejs.org/api/querystring.html

// parse an http request url into a query object.
// request is { params.path, raw.req.url }
// eg for url = 'localhost:4003/api/v1/books/scifi?fields=name,type&sortby=name'
// returns a query object like
// {
//   path: 'books/scifi',
//   pathArray: ['books', 'scifi'],
//   url: 'localhost:4003/api/v1/books/scifi?fields=name,type&sortby=name',
//   params: {
//     fields: ['name', 'type'],
//     sortby: ['year', 'name'],
//   },
// }
module.exports = function getQuery(request) {
  // get url path and parameters
  const path = request.params.path || '' // eg 'books/scifi'
  const pathArray = path.split('/') // eg ['books', 'scifi']
  const firstOfPath = pathArray[0] // eg 'books'
  const restOfPath = pathArray.slice(1).join('/') // eg 'scifi'
  const url = request.raw.req.url // eg 'localhost:4003/books/scifi?fields=name,type&sortby=name'
  const urlParams = url.split('?')[1] // eg 'fields=name,type&sortby=name'

  // get param object and string
  // note: querystring lib returns a string if one value, an array if >1
  const requestParams = querystring.parse(urlParams) // eg { fields: ['name','type'], sortby: 'name' }
  const defaultParams = {
    fields: 'name,type,description'.split(','),
    sortby: '',
    where: '',
    follow: '', // 'children',
    offset: 0,
    limit: 20,
    depth: 1,
    q: '',
  }
  const params = { ...defaultParams, ...requestParams }
  // //.?
  // if (path.endsWith('/')) {
  //   params.depth = 0
  // }
  const paramsString = querystring.stringify(params)

  const query = {
    path,
    pathArray,
    firstOfPath,
    restOfPath,
    url,
    params,
    paramsString,
  }
  console.log('getQuery', query)
  return query
}
