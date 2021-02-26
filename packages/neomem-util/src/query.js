// build query objects and urls

const { Path } = require('./path')

/**
 * Query objects are like sql - they specify what you want to
 * get from a datasource.
 * First the ui builds one up and we convert it to a url to fetch the data,
 * then the backend parses the url back into a query object, which it
 * will traverse to find the data to return.
 */
class Query {
  // Don't call this directly - call make
  constructor() {
    this.base = null
    this.params = null
  }

  /**
   * Make a query object from the given parts,
   * @param base {string} eg 'http://localhost:4000/api/v1/'
   * @param params {Object} eg { fields: 'name,url', sortby: 'name' }
   * @returns {Query}
   */
  static make(base = '', params = {}) {
    const query = new Query()
    query.base = base
    query.params = params
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
    const paramsString = request.raw.req.url.split('?')[1] || '{}'
    const params = JSON.parse(decodeURIComponent(paramsString))
    const query = Query.make(base, params)
    return query
  }

  /**
   * Make a copy of this query with the given param modifications.
   * @returns {Query}
   */
  with(params) {
    const query = this.copy()
    query.params = { ...query.params, ...params }
    // const fields = metadata.view.columns.map(col => col.key).join(',')
    return query
  }

  /**
   * Create and return a copy of this query.
   * @returns {Query}
   */
  copy() {
    const query = Query.make(this.base, JSON.parse(JSON.stringify(this.params)))
    return query
  }

  /**
   * Get the url representation of this query.
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
    // const path = Path.getRest(this.params.path)
    const { rest } = Path.split(this.params.path)
    query.base = item.url
    query.params.path = rest
    return query.url
  }

  //. merge with above
  getReducedQuery() {
    const query = this.copy()
    // const path = Path.getRest(this.params.path)
    const { rest } = Path.split(this.params.path)
    query.params.path = rest
    return query
  }
}

module.exports = { Query }
