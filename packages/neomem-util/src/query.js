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
//  * @property {string} fields - list of field names to retrieve
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

/**
 * Query class
 */
class CQuery {
  constructor(parts) {
    this.update(parts)
    return this
  }

  update(parts = {}) {
    for (const key of Object.keys(parts)) {
      this[key] = parts[key]
    }
    return this
  }

  get parts() {
    return { ...this }
  }

  get(property) {
    return this[property]
  }

  get first() {
    const first = this.path ? this.path.split('/')[0] : ''
    return first
  }

  get fields() {
    const q = querystring.parse(this.search || '')
    const fields = q.fields && q.fields.split(',')
    return fields
  }

  /**
   * returns a new query that requests the metadata assoc with the location
   */
  meta(metapath = '') {
    const query = new CQuery(this.parts)
    query.path += '.neomem' + (metapath ? '/' + metapath : '')
    return query
  }

  get isMeta() {
    return this.path && this.path.startsWith('.neomem')
  }

  /**
   * returns a new query that requests the fields assoc with the given view obj
   */
  view(view) {
    const query = new CQuery(this.parts)
    const fields = view.columns
      ? 'fields=' + view.columns.map(column => column.key).join(',')
      : ''
    query.update({ fields })
    // query.update({ search })
    return query
  }

  get search() {
    const skeys = []
    for (const key of Object.keys(this)) {
      const skey = key + '=' + this[key]
      skeys.push(skey)
    }
    const s = skeys.join('&')
    return s
  }

  get url() {
    //. use node's url lib to construct url?
    const url = `${this.base}/${this.path}?${this.search}`
    console.log(97, 'get url', url)
    return url
  }

  // getRemainingUrl(item) {
  //   return `${item.url || ''}/api/v1/${path.restString}?${queryString}`
  // },
}

/**
 * Parse a Hapi request into a query object
 * @param request {Object}
 * @returns {CQuery}
 */
function parseRequest(request, apiversion = '') {
  const { protocol, host, port } = request.server.info
  const base = protocol + '://' + host + (port ? ':' + port : '') + apiversion
  const path = request.params.path // eg 'bookmarks/books'
  // const search = request.query // parsed query object
  const search = request.raw.req.url.split('?')[1] // eg 'fields=name,url&sortby=name'
  const hash = request.hash
  const query = make({ base, path, search, hash })
  return query
}

const Query = {
  make,
  parseRequest,
}

module.exports = { Query }
