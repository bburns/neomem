// build query objects and urls

const pathlib = require('path') // node lib
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
  /**
   * Don't call this directly - call make
   */
  constructor(base = '', params = {}) {
    this._base = base
    this._params = params
    // this._paramsObj = new URLSearchParams(params) // dict of params and js representations
    return this
  }

  /**
   * Make a query object from the given parts,
   * eg make('http://localhost:4000/api/v1/', 'bookmarks', ...)
   * @param base {string} eg 'http://localhost:4000/api/v1/'
   * @param params {Object} eg { fields: 'name,url', sortby: 'name' }
   * @returns {Query}
   */
  static make(base = '', params = {}) {
    const query = new Query(base, params)
    return query
  }

  /**
   * Parse a Hapi request into a query object
   * @param request {Object}
   * @param apiversion? {string} - eg '/api/v1/'
   * @returns {Query}
   */
  static makeFromRequest(request, apiversion = '') {
    const { protocol, host, port } = request.server.info
    const base = protocol + '://' + host + (port ? ':' + port : '') + apiversion
    const paramsString = request.raw.req.url.split('?')[1] || ''
    const params = JSON.parse(decodeURIComponent(paramsString))
    params.path = request.params.path || ''
    const query = Query.make(base, params)
    return query
  }

  get base() {
    return this._base
  }
  set base(s) {
    this._base = s
  }

  get params() {
    return this._params
  }
  set params(obj) {
    this._params = obj
  }

  set(key, value) {
    this._params[key] = value
    return this
  }

  /**
   * Get a new query that requests the metadata assoc with the item.
   * @param metapath {string} - need this?
   * @returns {Query}
   */
  getMetaQuery(metapath = '') {
    const query = this.copy()
    query.params.meta = 1
    return query
  }

  /**
   * Is the current query a metaquery?
   * @returns {boolean}
   */
  get isMeta() {
    return this.params.meta === 1
  }

  /**
   * Get a new query that requests the fields assoc with the given view object.
   * e.g. if view is { columns: [{key:'name'}, {key:'url'}]} then
   * this would update query.params.fields to ['name', 'url'].
   * @returns {Query}
   */
  getViewQuery(metadata = { view: { columns: [] } }) {
    const query = this.copy()
    const fields = metadata.view.columns.map(column => column.key).join(',') // eg 'name,url'
    query._params.fields = fields
    return query
  }

  /**
   * Create and return a copy of this query.
   */
  copy() {
    const query = new Query(this.base, JSON.parse(JSON.stringify(this.params)))
    return query
  }

  /**
   * Get the url string representation of this query.
   * @returns {string} eg "http://localhost:4000/api/v1/bookmarks?fields=name,url"
   */
  get url() {
    const url =
      this.base + '?' + encodeURIComponent(JSON.stringify(this.params))
    return url
  }

  /**
   * Get a string representation of this query
   * @returns {string}
   */
  toString() {
    return decodeURIComponent(this.url)
  }

  get str() {
    return this.toString()
  }

  //. url but cuts out first part of path
  getRemainingUrl(item) {
    const query = this.copy()
    const path = Path.getRest(this.params.path)
    query.base = item.url
    query.params.path = path
    return query.url
  }

  //. merge with above
  getReducedQuery() {
    const query = this.copy()
    const path = Path.getRest(this.params.path)
    query.params.path = path
    return query
  }
}

module.exports = { Query }
