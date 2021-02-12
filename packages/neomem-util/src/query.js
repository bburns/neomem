// build query objects from server requests

const querystring = require('querystring') // node lib https://nodejs.org/api/querystring.html
const { Path } = require('./path')

/**
 * Query objects are kind of like sql - they specify what you want to
 * get from a datasource.
 * may take a while to hammer out details.
 * @typedef {Object} TQuery
 * @property {boolean} depthZero
 * @property {string} first
 * @property {boolean} meta
 * @property {string[]} fields
 * @property {function} getUrl
 * @property {function} getRemainingUrl
 */

/**
 * Hapi api request objects.
 * @typedef {Object} TRequest
 * @property {Object} params
 * @property {Object} query
 */

//. use hapi-url lib?
//. merge make and makeFromUrl

// const emptyRequest = { params: { path: '' }, raw: { req: { url: '' } } }
const emptyRequest = {
  params: { path: '' },
  query: '',
}

// function extractPathString(url) {
//   const pathString = ''
//   return pathString
// }

// function makeFromUrl(url) {
//   const pathString = extractPathString(url)
//   const request = {
//     params: { path: pathString },
//     raw: { req: { url } },
//   }
//   return makeFromRequest(request)
// }

/**
 * Parse a hapi http request object into a TQuery object.
 * request is { params.path, raw.req.url } //. uck
 * eg url = 'localhost:4003/api/v1/books/scifi?fields=name,type&sortby=name'
 * gives params.path = '/books/scifi'
 * and query = 'fields=name,type&sortby=name'
 * @param request {TRequest}
 * @returns {TQuery}
 */
function makeFromRequest(request = emptyRequest) {
  const path = Path.make(request.params.path) // eg { string: 'books/scifi', ... }
  // const url = request.raw.req.url // eg 'localhost:4003/books/scifi?fields=name,type&sortby=name'
  // const urlQuery = url.split('?')[1] || '' // eg 'fields=name,type&sortby=name'
  // const urlQuery = request.query

  // get param object and string
  // note: querystring lib returns a string if one value, an array if >1
  const requestQuery = querystring.parse(request.query) // eg { fields: 'name,type', sortby: 'name' }
  const defaultQuery = {
    fields: 'name,type,description',
    depth: 0,
    // sortby: '',
    // where: '',
    // follow: '', // 'children',
    // offset: 0,
    // limit: 20,
    // q: '',
  }
  const queryDict = { ...defaultQuery, ...requestQuery }
  const queryString = querystring.stringify(queryDict).replace(/%2C/g, ',')

  const depthZero = Number(queryDict.depth || 0) === 0
  const first = path.first
  const meta = path.str.endsWith('.neomem')
  const fields = queryDict.fields.split(',')
  // typeof queryDict.fields === 'string' ? [queryDict.fields] : queryDict.fields

  const query = {
    depthZero,
    meta,
    first,
    fields,
    /** @param baseUrl { string } */
    getUrl(baseUrl) {
      return `${baseUrl}/${path.str}?${queryString}`
    },
    getRemainingUrl(item) {
      return `${item.url || ''}/api/v1/${path.restString}?${queryString}`
    },
  }
  return query
}

const Query = {
  makeFromRequest,
}

module.exports = { Query }
