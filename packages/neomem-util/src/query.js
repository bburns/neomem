const querystring = require('querystring') // node lib https://nodejs.org/api/querystring.html
const { Path } = require('./path')

// function make(url = '') {
//   const path = Path.make(url)
//   const paramsString = url.split('?')[1] || ''
//   const params = querystring.parse(paramsString)
//   const query = {
//     path,
//     url,
//     params,
//     paramsString,
//   }
//   return query
// }

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
function make(request) {
  const path = Path.make(request ? request.params.path : '')
  const url = request ? request.raw.req.url : '' // eg 'localhost:4003/books/scifi?fields=name,type&sortby=name'
  const urlParams = url.split('?')[1] || '' // eg 'fields=name,type&sortby=name'

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

  // const query = {
  //   path,
  //   params,
  //   paramsString,
  //   url,
  // }
  // return query

  const depthZero = Number(params.depth || 0) === 0
  const first = path.first

  return {
    get depthZero() {
      return depthZero
    },
    get first() {
      return first
    },
    getRemainingUrl(item) {
      return `${item.url}/api/v1/${path.restString}?${paramsString}`
    },
  }
}

const Query = {
  make,
}

module.exports = { Query }
