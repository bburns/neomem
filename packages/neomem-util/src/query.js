const querystring = require('querystring') // node lib https://nodejs.org/api/querystring.html
const { Path } = require('./path')

const emptyRequest = {
  params: { path: '' },
  raw: { req: { url: '' } },
}

// parse an http request url into a query object.
// request is { params.path, raw.req.url }
// eg with url = 'localhost:4003/api/v1/books/scifi?fields=name,type&sortby=name'
// and path = '/books/scifi'
// returns a query object
function make(request = emptyRequest) {
  const path = Path.make(request.params.path)
  const url = request.raw.req.url // eg 'localhost:4003/books/scifi?fields=name,type&sortby=name'
  const urlParams = url.split('?')[1] || '' // eg 'fields=name,type&sortby=name'

  // get param object and string
  // note: querystring lib returns a string if one value, an array if >1
  const requestParams = querystring.parse(urlParams) // eg { fields: 'name,type', sortby: 'name' }
  const defaultParams = {
    fields: 'name,type,description',
    // depth: 0,
    // sortby: '',
    // where: '',
    // follow: '', // 'children',
    // offset: 0,
    // limit: 20,
    // q: '',
  }
  const params = { ...defaultParams, ...requestParams }
  const paramsString = querystring.stringify(params).replace(/%2C/g, ',')

  const depthZero = Number(params.depth || 0) === 0
  const first = path.first
  const meta = url.endsWith('.neomem')
  const fields = params.fields.split(',')
  // typeof params.fields === 'string' ? [params.fields] : params.fields

  return {
    depthZero,
    first,
    meta,
    fields,
    getRemainingUrl(item) {
      return `${item.url || ''}/api/v1/${path.restString}?${paramsString}`
    },
  }
}

const Query = {
  make,
}

module.exports = { Query }
