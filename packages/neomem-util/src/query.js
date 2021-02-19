// build query objects and urls

const { URLSearchParams } = require('url') // node lib https://nodejs.org/api/url.html
const { Path } = require('./path')

/**
 * Query objects are like sql - they specify what you want to
 * get from a datasource.
 * First the ui builds one up and we convert it to a url to fetch the data,
 * then the backend parses the url back into a query object, which it
 * will traverse to find the data to return.
 */
class Query {
  constructor(base = '', path = '', params = '', hash = '') {
    this._baseObj = new Base(base) // base of url eg 'http://localhost:4000/api/v1'
    this._pathObj = new Path(path) // path to item, eg '/bookmarks/books'
    this._paramsObj = new URLSearchParams(params) // dict of params and js representations
    this._hashObj = new Hash(hash) // hashtag at end of url eg #foo
    return this
  }

  /**
   * Make a query object from the given parts,
   * eg make('http://localhost:4000/api/v1', 'bookmarks', ...)
   * @returns {Query}
   */
  static make(base = '', path = '', params = '', hash = '') {
    const query = new Query(base, path, params, hash)
    return query
  }

  /**
   * Parse a Hapi request into a query object
   * @param request {Object}
   * @param apiversion? {string} - eg '/api/v1'
   * @returns {Query}
   */
  static makeFromRequest(request, apiversion = '') {
    const { protocol, host, port } = request.server.info
    const base = protocol + '://' + host + (port ? ':' + port : '') + apiversion
    const path = request.params.path // eg 'bookmarks/books'
    const params = request.raw.req.url.split('?')[1] // eg 'fields=name,url&sortby=name'
    const hash = request.hash
    const query = Query.make(base, path, params, hash)
    return query
  }

  // /**
  //  * Update the query with the given parts,
  //  * e.g. query.update({ path: 'pokpok', hash: 'kjnkjn' })
  //  * @returns {Query} this query, for chaining
  //  */
  // update(parts = {}) {
  //   for (const key of Object.keys(parts)) {
  //     this[key] = parts[key]
  //   }
  //   return this
  // }

  // /**
  //  * Get the basic parts of the query { base, path, params, hash }.
  //  * Note: this is just a shallow copy of this query - use .copy for deep copy.
  //  * @returns {Object}
  //  */
  // get parts() {
  //   return { ...this } // bug: only does a shallow copy
  // }

  get base() {
    return this._baseObj.toString()
  }
  set base(s) {
    this._baseObj = new Base(s)
  }

  get path() {
    return this._pathObj.toString()
  }
  set path(s) {
    this._pathObj = new Path(s)
  }

  get params() {
    return this._paramsObj.toString().replace(/%2C/g, ',')
  }
  set params(s) {
    this._paramsObj = new URLSearchParams(s)
  }

  get paramsObj() {
    return this._paramsObj
  }

  get hash() {
    return this._hashObj.toString()
  }

  // /**
  //  * Get the first part of the path
  //  * @returns {string}
  //  */
  // //. delegate to path, or make user say query.pathObj.first
  // get first() {
  //   // const first = this._path ? this._path.split('/')[0] : ''
  //   const first = this._pathObj.first
  //   return first
  // }

  // /**
  //  * Make a deep copy of this query object
  //  */
  // copy() {
  //   const parts = {
  //     base: this.base + '',
  //     path: this.path + '',
  //     params: JSON.parse(JSON.stringify(this.params)),
  //     hash: this.hash + '',
  //   }
  //   const query = new Query(parts)
  //   return query
  // }

  /**
   * Get a new query that requests the metadata assoc with the location.
   * @returns {Query}
   */
  meta(metapath = '') {
    const query = new Query(this.base, this.path, this.params, this.hash)
    query.path += '.neomem' + (metapath ? '/' + metapath : '')
    query.paramsObj.set('meta', '1') //. or just check for .neomem in path?
    return query
  }

  /**
   * Is the current query a metaquery?
   * @returns {boolean}
   */
  get isMeta() {
    // return this.path && this.path.startsWith('/.neomem')
    return this._paramsObj.get('meta') === '1'
  }

  /**
   * Get a new query that requests the fields assoc with the given view object.
   * e.g. if view is { columns: [{key:'name'}, {key:'url'}]} then
   * this would update query.params.fields to ['name', 'url'].
   * @returns {Query}
   */
  view(view = { columns: [] }) {
    const query = new Query(this.base, this.path, this.params, this.hash)
    const fields = view.columns.map(column => column.key).join(',')
    query.paramsObj.set('fields', fields)
    return query
  }

  // /**
  //  * Get a string representation of the params object.
  //  * e.g. "fields=name,url&sortby=name"
  //  */
  // //. oh, will fail if fields is an array -
  // //. use URL's parser etc
  // get paramsString() {
  //   const skeys = []
  //   for (const key of Object.keys(this.params)) {
  //     // const skey = key + '=' + this.params[key]
  //     const value = this.params[key]
  //     const svalue = Array.isArray(value) ? value.join(',') : value
  //     const skey = key + '=' + svalue
  //     skeys.push(skey)
  //   }
  //   const s = skeys.join('&')
  //   return s
  // }

  // /**
  //  * Set the string representation of the search parameters
  //  * @param s {string}
  //  */
  // set paramsString(s) {
  //   const params = {}
  //   const pairs = s.split('&')
  //   for (const pair of pairs) {
  //     const [key, value] = pair.split('=')
  //     params[key] = value
  //   }
  //   this.params = params
  // }

  /**
   * Get the url string representation of this query.
   * @returns {string} eg "http://localhost:4000/api/v1/bookmarks?fields=name,url"
   */
  toString() {
    const str =
      this.base + this.path + (this.params ? '?' + this.params : '') + this.hash
    return str
  }

  get str() {
    return this.toString()
  }

  //. url but cuts out first part of path
  //. remainingUrl(item) {
  //   return `${item.url || ''}/api/v1/${path.restString}?${paramsString}`
  // },
}

class Base {
  constructor(base = '') {
    this._str = base
  }
  toString() {
    return this._str
  }
}

class Hash {
  constructor(hash = '') {
    this._str = hash
  }
  toString() {
    return this._str
  }
}

module.exports = { Query }
