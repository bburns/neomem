// query objects are kind of like sql -
// they specify what you want to get from a datasource

const querystring = require('querystring') // node lib https://nodejs.org/api/querystring.html
const { Path } = require('./path')

//. clean this all up -
// make a Request namespace to parse out request?
// use hapi-url lib
// merge make and makeFromUrl

const emptyRequest = {
  params: { path: '' },
  raw: { req: { url: '' } },
}

function extractPathString(url) {
  const pathString = ''
  return pathString
}

function makeFromUrl(url) {
  const pathString = extractPathString(url)
  const request = {
    params: { path: pathString },
    raw: { req: { url } },
  }
  return make(request)
}

/**
 * @typedef {Object} query
 * @property {boolean} depthZero
 * @property {string} first
 * @property {boolean} meta
 * @property {string[]} fields
 * @property {function} getUrl
 * @property {function} getRemainingUrl
 */

/**
 * Parse a hapi http request object into a query object.
 * request is { params.path, raw.req.url } //. uck
 * eg with url = 'localhost:4003/api/v1/books/scifi?fields=name,type&sortby=name'
 * and params.path = '/books/scifi'
 * @returns {query}
 */
function make(request = emptyRequest) {
  const path = Path.make(request.params.path) // eg { string: 'books/scifi', ... }
  const url = request.raw.req.url // eg 'localhost:4003/books/scifi?fields=name,type&sortby=name'
  const urlParams = url.split('?')[1] || '' // eg 'fields=name,type&sortby=name'

  // get param object and string
  // note: querystring lib returns a string if one value, an array if >1
  const requestParams = querystring.parse(urlParams) // eg { fields: 'name,type', sortby: 'name' }
  const defaultParams = {
    fields: 'name,type,description',
    // depth: 0,
    // sortby: '',
    // where: '',
    // follow: '', // 'children',
    // offset: 0,
    // limit: 20,
    // q: '',
  }
  const params = { ...defaultParams, ...requestParams }
  const paramsString = querystring.stringify(params).replace(/%2C/g, ',')

  const depthZero = Number(params.depth || 0) === 0
  const first = path.first
  const meta = url.endsWith('.neomem')
  const fields = params.fields.split(',')
  // typeof params.fields === 'string' ? [params.fields] : params.fields

  return {
    depthZero,
    meta,
    first,
    fields,
    /** @param baseUrl { string } */
    getUrl(baseUrl) {
      return `${baseUrl}/${path.str}?${paramsString}`
    },
    getRemainingUrl(item) {
      return `${item.url || ''}/api/v1/${path.restString}?${paramsString}`
    },
  }
}

const Query = {
  make,
  makeFromUrl,
}

module.exports = { Query }
