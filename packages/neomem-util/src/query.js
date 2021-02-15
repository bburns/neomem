// build query objects and urls

const querystring = require('querystring') // node lib https://nodejs.org/api/querystring.html
const URL = require('url').URL // node lib https://nodejs.org/api/url.html
const pathlib = require('path') // node lib
const { Path } = require('./path')

/**
 * Query objects are like sql - they specify what you want to
 * get from a datasource.
 * First the ui builds one up and we convert it to a url to fetch the data,
 * then the backend parses the url back into a query object, which it
 * traverses to find the data to return.
//  * @typedef {Object} CQuery
//  * @property {string} base - base of url, eg 'http://localhost:4000/api/v1'
//  * @property {string} path - path to item, eg 'bookmarks/books'
//  * @property {string} fields - list of fields to retrieve
//  * @property {string} depth - depth to pursue related items
//  * @property {string} url - represents query as a url
//  * @property {string} remainingUrl - url but cuts out first part of path
 */

/**
 * Make a query object
 * @param parts {Object} eg { base: 'http://localhost:4000/api/v1', path: 'bookmarks', ... }
 * @returns {CQuery}
 */
function make(parts) {
  const query = new CQuery()
  query.update(parts)
  return query
}

class CQuery {
  constructor(parts) {
    this.update(parts)
  }

  update(parts = {}) {
    for (const key of Object.keys(parts)) {
      this[key] = parts[key]
    }
  }

  get parts() {
    return { ...this }
  }

  get(property) {
    return this[property]
  }

  /**
   * returns a new query that requests the metadata assoc with the location
   */
  meta(metapath = '') {
    const query = new CQuery(this.parts)
    query.path += '.neomem' + (metapath ? '/' + metapath : '')
    return query
  }

  /**
   * returns a new query that requests the fields assoc with the given view obj
   */
  view(view) {
    const query = new CQuery(this.parts)
    //. update search, not fields
    const fields = view.fields
    query.update({ fields })
    return query
  }

  get url() {
    //. use node's url lib to construct url?
    const url = `${this.base}/${this.path}?${this.search}`
    return url
  }

  // getRemainingUrl(item) {
  //   return `${item.url || ''}/api/v1/${path.restString}?${queryString}`
  // },
}

// /**
//  * Parse a url object to a CQuery object.
//  * eg url = 'http://localhost:4003/api/v1/books/scifi?fields=name,type&sortby=name'
//  * => urlobj = { protocol: 'http', host: 'localhost', ... }
//  * => query = { base: 'http://localhost:4003/api/v1', path: 'books/scifi', ... }
//  * @param urlobj {Object}
//  * @returns {CQuery}
//  */
// function parseUrlObj(urlobj, apiversion = '') {
//   console.log(93, urlobj, apiversion)
//   console.log(94, urlobj.format()) // http://localhost:4003/api/v1/books/scifi?fields=...
//   console.log(95, urlobj.href)
//   // console.log(urlobj.resolve('pokpok')) // http://localhost:4003/pokpok
//   // const urlobj = new URL(url)
//   // console.log(urlobj.searchParams) // undefined

//   const url = urlobj.format() // the url string
//   console.log(100, url)
//   const u = new URL(url)
//   console.log(102, u)
//   const { origin, pathname, search, hash } = u
//   const base = origin + apiversion

//   // const { protocol, host, port, pathname } = urlobj
//   // const base =
//   //   protocol + '://' + host + port
//   //     ? ':' + port
//   //     : '' + apiversion
//   //     ? '/' + apiversion
//   //     : ''

//   // console.log(urlobj.context)
//   // const { scheme, host, port, fragment } = urlobj.context
//   // const pathname = urlobj.pathname
//   // const search = urlobj.context.query

//   // const base = scheme + '//' + host + port ? ':' + port : '' + apiversion
//   const path = pathname.startsWith(apiversion)
//     ? pathname.slice(apiversion.length)
//     : pathname
//   // const hash = fragment

//   // const search = urlobj.search
//   // const hash = urlobj.hash

//   const parts = { base, path, search, hash }
//   console.log(parts)
//   const query = new CQuery(parts)
//   console.log(query)
//   return query
// }

/**
 * Parse a Hapi request into a query object
 * @param request {Object}
 * @returns {CQuery}
 */
function parseRequest(request, apiversion = '') {
  // console.log(143, request)
  const { protocol, host, port } = request.server.info
  // const apiversion = request.path // eg '/api/v1'
  const base = protocol + '://' + host + (port ? ':' + port : '') + apiversion
  const path = request.params.path // eg 'bookmarks/books'
  // const search = request.query // parsed query object
  const search = request.raw.req.url.split('?')[1] // eg 'fields=name,url&sortby=name'
  const hash = request.hash
  const query = make({ base, path, search, hash })
  console.log(query)
  return query
}

const Query = {
  make,
  // parseUrlObj,
  parseRequest,
}

module.exports = { Query }
