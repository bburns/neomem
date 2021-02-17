// build query objects and urls

// const querystring = require('querystring') // node lib https://nodejs.org/api/querystring.html
// const URL = require('url').URL // node lib https://nodejs.org/api/url.html
// const pathlib = require('path') // node lib
// const { Path } = require('./path')

/**
 * Query objects are like sql - they specify what you want to
 * get from a datasource.
 * First the ui builds one up and we convert it to a url to fetch the data,
 * then the backend parses the url back into a query object, which it
 * traverses to find the data to return.
 * @typedef {Object} TQuery
 * @property {string} base - base of url, eg 'http://localhost:4000/api/v1'
 * @property {string} path - path to item, eg 'bookmarks/books'
 * @property {Object} params - dict of params and their js representations
 * @property {string} hash - the hashtag at the end of the url, eg #foo
 * @property {string} url - represents query as a url
 * @property {string} remainingUrl - url but cuts out first part of path
 */
class CQuery {
  constructor(parts) {
    this.base = ''
    this.path = ''
    this.params = {}
    this.hash = ''
    this.update(parts)
    return this
  }

  /**
   * Update the query with the given parts,
   * e.g. query.update({ path: 'pokpok', hash: 'kjnkjn' })
   * @returns {CQuery} this query, for chaining
   */
  update(parts = {}) {
    for (const key of Object.keys(parts)) {
      this[key] = parts[key]
    }
    return this
  }

  /**
   * Get the basic parts of the query { base, path, params, hash }.
   * Note: this is just a shallow copy of this query - use .copy for deep copy.
   * @returns {Object}
   */
  get parts() {
    return { ...this } // bug: only does a shallow copy
  }

  /**
   * Set a param value, e.g. query.set('fields', 'name,url')
   * @param key {string}
   * @param value {any}
   * @return {CQuery} this query, for chaining
   */
  set(key, value) {
    this.params[key] = value
    return this
  }

  /**
   * Get the first part of the path
   * @returns {string}
   */
  get first() {
    const first = this.path ? this.path.split('/')[0] : ''
    return first
  }

  /**
   * Make a deep copy of this query object
   */
  copy() {
    const parts = {
      base: this.base + '',
      path: this.path + '',
      params: JSON.parse(JSON.stringify(this.params)),
      hash: this.hash + '',
    }
    const query = new CQuery(parts)
    return query
  }

  /**
   * Get a new query that requests the metadata assoc with the location.
   * @returns {CQuery}
   */
  meta(metapath = '') {
    const query = this.copy()
    query.path += '.neomem' + (metapath ? '/' + metapath : '')
    query.set('meta', 1)
    return query
  }

  /**
   * Is the current query a metaquery?
   * @returns {boolean}
   */
  get isMeta() {
    // return this.path && this.path.startsWith('.neomem')
    return this.params.meta
  }

  /**
   * Get a new query that requests the fields assoc with the given view object.
   * e.g. if view is { columns: [{key:'name'}, {key:'url'}]} then
   * this would update query.params.fields to ['name', 'url'].
   */
  view(view) {
    const query = this.copy()
    query.params.fields = view.columns.map(column => column.key)
    return query
  }

  /**
   * Get a string representation of the params object.
   * e.g. "fields=name,url&sortby=name"
   */
  //. oh, will fail if fields is an array -
  //. use URL's parser etc
  get paramsString() {
    const skeys = []
    for (const key of Object.keys(this.params)) {
      // const skey = key + '=' + this.params[key]
      const value = this.params[key]
      const svalue = Array.isArray(value) ? value.join(',') : value
      const skey = key + '=' + svalue
      skeys.push(skey)
    }
    const s = skeys.join('&')
    return s
  }

  /**
   * Set the string representation of the search parameters
   * @param s {string}
   */
  set paramsString(s) {
    const params = {}
    const pairs = s.split('&')
    for (const pair of pairs) {
      const [key, value] = pair.split('=')
      params[key] = value
    }
    this.params = params
  }

  /**
   * Get the url string representation of this query.
   * @returns {string} eg "http://localhost:4000/api/v1/bookmarks?fields=name,url"
   */
  get url() {
    const paramsString = this.paramsString
    let url = this.base
    url += this.path ? '/' + this.path : ''
    url += paramsString ? '?' + paramsString : ''
    url += this.hash ? '#' + this.hash : ''
    // // use node's url lib to construct url?
    // const urlobj = new URL(this.path || '', this.base)
    // urlobj.search = this.paramsString
    // urlobj.hash = this.hash
    // const url = urlobj.href
    return url
  }

  // remainingUrl(item) {
  //   return `${item.url || ''}/api/v1/${path.restString}?${paramsString}`
  // },
}

/**
 * Make a query object from the given parts,
 * eg make({ base: 'http://localhost:4000/api/v1', path: 'bookmarks', ... })
 * @param parts {Object}
 * @returns {CQuery}
 */
function make(parts) {
  const query = new CQuery()
  query.update(parts)
  return query
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
  const query = make({ base, path, paramsString: search, hash })
  return query
}

const Query = {
  make,
  parseRequest,
}

module.exports = { Query }
