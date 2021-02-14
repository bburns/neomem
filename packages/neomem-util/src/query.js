// build query objects

const querystring = require('querystring') // node lib https://nodejs.org/api/querystring.html
const URL = require('url').URL // node lib
const pathlib = require('path') // node lib
const { Path } = require('./path')

/**
 * Query objects are kind of like sql - they specify what you want to
 * get from a datasource.
 * First the ui builds one up and we convert it to a url to fetch the data,
 * then the backend parses the url back into a query object, which it
 * traverses to find the data to return.
 * @typedef {Object} TQuery
 * @property {string} base - base url, eg 'http://localhost:4000/api/v1'
 * @property {TPath} path - path to item, eg { str: 'bookmarks', ... }
 * @property {string[]} fields - list of fields to retrieve
 * @property {boolean} meta - asking for metadata about item
 * @property {integer} depth - depth to pursue related items
 * @property {function} url - represents query as a url
 * @property {function} remainingUrl - url but cuts out first part of path
 */

/**
 * Parse a url string to a TQuery object.
 * eg url = 'localhost:4003/api/v1/books/scifi?fields=name,type&sortby=name'
 * @param url {string}
 * @returns {TQuery}
 */
function parseUrl(url) {
  const urlobj = URL.parse(url)
  // const path = Path.make(request.params.path) // eg { string: 'books/scifi', ... }
  // note: querystring lib returns a string if one value, an array if >1
  // const requestQuery = querystring.parse(request.query) // eg { fields: 'name,type', sortby: 'name' }
  // return make({ base, path, params })
  return urlobj
}

/**
 * Make a query object
 * @param parts {Object} could be { base: 'http://localhost:4000', path: 'bookmarks', ... } etc
 * @returns {CQuery}
 */
function make(parts) {
  const query = new CQuery()
  query.update(parts)
  return query
}

/**
 * @typedef CQuery
 */
class CQuery {
  constructor() {
    // const depth = Number(queryDict.depth)
    // const fields = queryDict.fields.split(',')
    // const fields = typeof queryDict.fields === 'string' ? [queryDict.fields] : queryDict.fields
    // const first = path.first
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
  get(property) {
    return this[property]
  }
  meta(metapath) {
    // return this.path.endsWith('.neomem')
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
    this.path += '/.neomem'
    return this
  }
  get url() {
    //. use node's url lib to construct url
    const url = `${this.base}/${this.path}`
    //   //. should we make a class to handle these?
    // const queryString = querystring.stringify(queryDict).replace(/%2C/g, ',')
    //   // const s = `${query.path.str}?${query.paramsString}`
    //   // const url = baseUrl + '/' + s
    //   // getUrl(baseUrl) {
    //   //   return `${baseUrl}/${path.str}?${queryString}`
    //   // },
    //   //. ugh
    //   // getRemainingUrl(item) {
    //   //   return `${item.url || ''}/api/v1/${path.restString}?${queryString}`
    //   // },
    return url
  }
}

const Query = {
  parseUrl,
  make,
}

module.exports = { Query }
