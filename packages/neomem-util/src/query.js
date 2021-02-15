// build query objects and url representations

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
 * @typedef {Object} CQuery
 * @property {string} base - base of url, eg 'http://localhost:4000/api/v1'
 * @property {string} path - path to item, eg 'bookmarks/books'
 * @property {string} fields - list of fields to retrieve
 * @property {string} depth - depth to pursue related items
 * @property {string} url - represents query as a url
 * @property {string} remainingUrl - url but cuts out first part of path
 */

/**
 * Parse a url string to a CQuery object.
 * eg url = 'localhost:4003/api/v1/books/scifi?fields=name,type&sortby=name'
 * @param url {string}
 * @returns {CQuery}
 */
function parseUrl(url) {
  const urlobj = new URL(url)
  const parts = {
    base: urlobj.origin, //. better name than base? but it excludes /api/v1
  }
  const query = new CQuery()
  query.update(parts)
  return query
  // const path = Path.make(request.params.path) // eg { string: 'books/scifi', ... }
  // note: querystring lib returns a string if one value, an array if >1
  // const requestQuery = querystring.parse(request.query) // eg { fields: 'name,type', sortby: 'name' }
  // return make({ base, path, params })
}

/**
 * Make a query object
 * @param parts {Object} eg { base: 'http://localhost:4000', path: 'bookmarks', ... }
 * @returns {CQuery}
 */
function make(parts) {
  const query = new CQuery()
  query.update(parts)
  return query
}

class CQuery {
  constructor() {
    this.base = ''
    this.path = ''
    this.fields = ''
    this.depth = ''
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
    const query = new CQuery()
    query.update(this.parts)
    query.path += '.neomem' + (metapath ? '/' + metapath : '')
    return query
  }

  /**
   * returns a new query that requests the fields assoc with the given view obj
   */
  view(view) {
    const query = new CQuery()
    query.update(this.parts)
    const fields = view.fields
    query.update({ fields })
    return query
  }

  get url() {
    //. use node's url lib to construct url
    const url = `${this.base}/${this.path}` //. and queryString
    return url
  }

  // getRemainingUrl(item) {
  //   return `${item.url || ''}/api/v1/${path.restString}?${queryString}`
  // },
}

const Query = {
  parseUrl,
  make,
}

module.exports = { Query }
