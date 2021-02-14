// build query objects

/**
 * Query objects are kind of like sql - they specify what you want to
 * get from a datasource.
 * may take a while to hammer out details.
 * @typedef {Object} TQuery
 * @property {TPath} path - path to item
 * @property {boolean} meta - asking for metadata about item
 * @property {integer} depth - depth to pursue related items
 * @property {string[]} fields - list of fields to retrieve
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

// /**
//  * Make a query to get metadata info from the given path.
//  * @param path {TPath}
//  * @returns {TQuery}
//  */
// function makeMetadataQuery({ path }) {
//   // // const query = Query.makeFromPath(path, params)
//   // // const metadataQuery = { ...query, meta: true }
//   // //. const metadataQuery = Query.make()
//   // //. const metadata = await api.get(metadataQuery)
//   // const metadata = await getMetadata(path) //. const view = meta.get('view') ?
//   // // console.debug('metadata', metadata)
//   // // const fieldnames = getFieldNames(metadata) //. const fields = view.fields ?
//   // const fields = 'name,type,description,url'.split(',')
//   // const query = {
//   //   path,
//   //   params: {
//   //     fields, // eg ['name', 'type', 'description']
//   //     depth: 0, // look at the item not its contents
//   //   },
//   //   paramsString: '',
//   // }
//   const query = {
//     // path: pathLib.join(path.str, '.neomem'),
//     path: path.add('.neomem'),
//   }
//   return query
// }

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
function makeFromRequest({ request } = {}) {
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
  return make({ path, queryDict })
}

/**
 * Make a query object
 * @param {Object {base?: string, path?: string }}
 * @returns {TQuery}
 */
function make({ base, path } = {}) {
  // const queryString = querystring.stringify(queryDict).replace(/%2C/g, ',')
  // const meta = path && path.str.endsWith('.neomem')
  // const depth = Number(queryDict.depth)
  // const fields = queryDict.fields.split(',')
  // const fields = typeof queryDict.fields === 'string' ? [queryDict.fields] : queryDict.fields
  // const first = path.first

  // const query = new CQuery().base(base).path(path)
  const query = new CQuery(base)
  // query.path(path)
  query.update({ path })
  // const query = {
  //   base,
  //   path,
  //   meta,
  // depth,
  // fields,
  // first,
  // }
  return query
}

class CQuery {
  constructor(base) {
    this.base = base
    this.path = Path.make()
    return this
  }
  update(keyvalues) {
    for (const key of Object.keys(keyvalues)) {
      this[key] = keyvalues[key]
    }
  }
  // path(path) {
  //   this.path = path
  //   return this
  // }
  // fields(fields) {
  //   this.fields = fields
  //   return this
  // }
  get(property) {
    return this[property]
  }
  url() {
    //. use node's url lib to construct url
    return this.base + this.path.str
  }
  //   //. should we make a class to handle these?
  //   // const s = `${query.path.str}?${query.paramsString}`
  //   // const url = baseUrl + '/' + s
  //   // getUrl(baseUrl) {
  //   //   return `${baseUrl}/${path.str}?${queryString}`
  //   // },
  //   //. ugh
  //   // getRemainingUrl(item) {
  //   //   return `${item.url || ''}/api/v1/${path.restString}?${queryString}`
  //   // },
}

// function base(base) {
//   const query = new CQuery(base)
//   return query
// }

const Query = {
  makeFromRequest,
  make,
  // base,
}

module.exports = { Query }
