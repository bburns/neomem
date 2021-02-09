const test = require('ava')
const querystring = require('querystring')
const { Query, Path } = require('../src')

test(`make()`, async t => {
  const query = Query.make()
  const item = {}
  t.deepEqual(query.depthZero, true)
  t.deepEqual(query.first, '')
  t.deepEqual(
    query.getRemainingUrl(item),
    '/api/v1/?fields=name&fields=type&fields=description'
  )
})

test('make from request', t => {
  const baseUrl = 'http://localhost:4000/api/v1'
  const pathString = '/bookmarks/books/scifi'
  const paramsString = 'fields=name,type,url&sortby=name&depth=1'
  const url = baseUrl + pathString + '?' + paramsString
  const request = {
    params: { path: pathString },
    raw: { req: { url } },
  }
  // const path = Path.make(pathString)
  // const params = querystring.parse(paramsString)
  // params.depth = 1 // add depth
  const query = Query.make(request)
  // t.deepEqual(query.path, path)
  // t.deepEqual(query.url, url)
  // t.deepEqual(query.params, params)
  // t.deepEqual(query.paramsString, 'fields=name,type,url&depth=1&sortby=name')
  t.deepEqual(query.depthZero, false)
  t.deepEqual(query.fields, [])
})
