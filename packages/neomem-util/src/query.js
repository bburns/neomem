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
  constructor(base = '', params = {}) {
    this._base = base
    this._params = params
    // this._paramsObj = new URLSearchParams(params) // dict of params and js representations
    return this
  }

  /**
   * Make a query object from the given parts,
   * eg make('http://localhost:4000/api/v1', 'bookmarks', ...)
   * @param base {string} eg 'http://localhost:4000/api/v1'
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
   * @param apiversion? {string} - eg '/api/v1'
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

  get path() {
    return this._params.path
  }
  set path(s) {
    this._params.path = s
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
    // const query = new Query(this.base, this.params)
    const query = this.copy()
    query.params.meta = 1
    return query
  }

  /**
   * Is the current query a metaquery?
   * @returns {boolean}
   */
  get isMeta() {
    return this._params.meta === 1
  }

  /**
   * Get a new query that requests the fields assoc with the given view object.
   * e.g. if view is { columns: [{key:'name'}, {key:'url'}]} then
   * this would update query.params.fields to ['name', 'url'].
   * @returns {Query}
   */
  getViewQuery(metadata = { view: { columns: [] } }) {
    // const query = new Query(this.base, this.params)
    const query = this.copy()
    const fields = metadata.view.columns.map(column => column.key).join(',') // eg 'name,url'
    query._params.fields = fields
    return query
  }

  copy() {
    const query = new Query(this.base, JSON.parse(JSON.stringify(this.params)))
    return query
  }

  toString() {
    // const str =
    //   this.base + '?' + encodeURIComponent(JSON.stringify(this.params))
    // return str
    return decodeURIComponent(this.url)
  }

  get str() {
    return this.toString()
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

  //. url but cuts out first part of path
  getRemainingUrl(item) {
    const path = Path.getRest(this.params.path)
    const query = this.copy()
    query.base = item.url
    query.params.path = path
    return query.url
  }

  // getReducedQuery() {
  //   const query = new Query(
  //     this.base,
  //     this._pathObj.rest,
  //     this.params,
  //     this.hash
  //   )
  //   return query
  // }
}

module.exports = { Query }
