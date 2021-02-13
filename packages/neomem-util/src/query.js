// build query objects from server requests

/**
 * Query objects are kind of like sql - they specify what you want to
 * get from a datasource.
 * may take a while to hammer out details.
 * @typedef {Object} TQuery
 * @property {boolean} meta - asking for metadata about item
 * @property {integer} depth - depth to pursue related items
 * @property {string[]} fields - list of fields to retrieve
 * @property {string} first - first part of path
 * @property {function} getUrl
 * @property {function} getRemainingUrl
 */

/**
 * Hapi api request objects.
 * @typedef {Object} TRequest
 * @property {Object} params
 * @property {Object} query
 */

const querystring = require('querystring') // node lib https://nodejs.org/api/querystring.html
const { Path } = require('./path')

/**
 * Make a query to get metadata info from the given path.
 * @param path {TPath}
 * @returns {TQuery}
 */
function makeMetadataQuery({ path }) {
  // // const query = Query.makeFromPath(path, params)
  // // const metadataQuery = { ...query, meta: true }
  // //. const metadataQuery = Query.make()
  // //. const metadata = await api.get(metadataQuery)
  // const metadata = await getMetadata(path) //. const view = meta.get('view') ?
  // // console.debug('metadata', metadata)
  // // const fieldnames = getFieldNames(metadata) //. const fields = view.fields ?
  // const fields = 'name,type,description,url'.split(',')
  // const query = {
  //   path,
  //   params: {
  //     fields, // eg ['name', 'type', 'description']
  //     depth: 0, // look at the item not its contents
  //   },
  //   paramsString: '',
  // }
  const query = {
    // path: pathLib.join(path.str, '.neomem'),
    path: path.add('.neomem'),
  }
  return query
}

/**
 * Parse a hapi http request object into a TQuery object.
 * eg url = 'localhost:4003/api/v1/books/scifi?fields=name,type&sortby=name'
 * would make a request object like
 * {
 *   params: { path: 'books/scifi' },
 *   query: 'fields=name,type&sortby=name'
 * }
 * @param request {TRequest}
 * @returns {TQuery}
 */
function makeFromRequest({ request }) {
  const path = Path.make(request.params.path) // eg { string: 'books/scifi', ... }

  // get query dict and string
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

  const meta = path.str.endsWith('.neomem')
  const depth = Number(queryDict.depth)
  const fields = queryDict.fields.split(',')
  // const fields = typeof queryDict.fields === 'string' ? [queryDict.fields] : queryDict.fields
  const first = path.first

  const query = {
    meta,
    depth,
    fields,
    first,
    //. should we make a class to handle these?
    // const s = `${query.path.str}?${query.paramsString}`
    // const url = baseUrl + '/' + s
    getUrl(baseUrl) {
      return `${baseUrl}/${path.str}?${queryString}`
    },
    //. ugh
    getRemainingUrl(item) {
      return `${item.url || ''}/api/v1/${path.restString}?${queryString}`
    },
  }
  return query
}

function make({ path, metadata, request } = {}) {
  if (request) {
    return makeFromRequest({ request })
  }
  if (metadata === true) {
    return makeMetadataQuery({ path })
  }
  return {
    depth: 0,
    fields: 'name,type,description'.split(','),
    first: '',
  }
}

const Query = {
  make,
}

module.exports = { Query }
