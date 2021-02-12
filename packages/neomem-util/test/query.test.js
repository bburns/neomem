const test = require('ava').default
// const querystring = require('querystring')
const { Query } = require('../src')

test(`Query.makeFromRequest() - a default query`, async t => {
  const query = Query.makeFromRequest()
  const item = {}
  t.deepEqual(query.depthZero, true)
  t.deepEqual(query.first, '')
  t.deepEqual(
    query.getRemainingUrl(item),
    '/api/v1/?fields=name,type,description&depth=0'
  )
  t.deepEqual(query.fields, 'name,type,description'.split(','))
})

test('Query.makeFromRequest(request) - make from request', t => {
  const baseUrl = 'http://localhost:4000/api/v1'
  const pathStr = '/bookmarks/books/scifi'
  const queryString = 'fields=name,type,url&sortby=name&depth=1'
  // const url = baseUrl + pathStr + '?' + queryString
  const request = {
    params: { path: pathStr },
    // raw: { req: { url } },
    query: queryString,
  }
  // const path = Path.make(pathStr)
  // const params = querystring.parse(queryString)
  // params.depth = 1 // add depth
  const query = Query.makeFromRequest(request)
  // t.deepEqual(query.path, path)
  // t.deepEqual(query.url, url)
  // t.deepEqual(query.params, params)
  // t.deepEqual(query.queryString, 'fields=name,type,url&depth=1&sortby=name')
  t.deepEqual(query.depthZero, false)
  t.deepEqual(query.fields, 'name,type,url'.split(','))
})
