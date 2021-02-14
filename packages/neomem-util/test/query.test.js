const test = require('ava').default
const { Query } = require('../src')

const base = 'http://localhost:4000/api/v1'

test(`Query.make() - an empty query`, async t => {
  const query = Query.make()
  t.deepEqual(query.base, '')
  t.deepEqual(query.path, '')
  t.deepEqual(query.fields, '')
  t.deepEqual(query.depth, '')
  t.deepEqual(query.url, '/')
})

test(`Query.make({base}) and update`, async t => {
  const query = Query.make({ base })
  t.deepEqual(query.base, base)
  query.update({ path: 'bookmarks' })
  t.deepEqual(query.path, 'bookmarks')
  t.deepEqual(query.url, base + '/bookmarks')
})

test(`Query.parseUrl()`, async t => {
  const query = Query.parseUrl(base)
  t.deepEqual(query.base, base)
})

// test('Query.makeFromRequest(request) - make from request', t => {
//   // const baseUrl = 'http://localhost:4000/api/v1'
//   const pathStr = '/bookmarks/books/scifi'
//   const queryString = 'fields=name,type,url&sortby=name&depth=1'
//   // const url = baseUrl + pathStr + '?' + queryString
//   const request = {
//     params: { path: pathStr },
//     query: queryString,
//   }
//   // const path = Path.make(pathStr)
//   // const params = querystring.parse(queryString)
//   // params.depth = 1 // add depth
//   const query = Query.makeFromRequest(request)
//   // t.deepEqual(query.path, path)
//   // t.deepEqual(query.url, url)
//   // t.deepEqual(query.params, params)
//   // t.deepEqual(query.queryString, 'fields=name,type,url&depth=1&sortby=name')
//   t.deepEqual(query.depth, 1)
//   t.deepEqual(query.fields, 'name,type,url'.split(','))
// })
