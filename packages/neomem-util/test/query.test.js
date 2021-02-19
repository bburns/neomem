const test = require('ava').default
const { Query } = require('../src')

const base = 'http://localhost:4000/api/v1/'

test(`Query.make() - should let you make an empty query`, async t => {
  const query = Query.make()
  t.deepEqual(query.base, '')
  t.deepEqual(query.path, '')
  t.deepEqual(query.params, '')
  t.deepEqual(query.hash, '')
  t.deepEqual(query.str, '')
})

test(`Query.make(base) - should make a query that is updateable`, async t => {
  const query = Query.make(base)
  t.deepEqual(query.base, base)
  query.path = 'bookmarks'
  t.deepEqual(query.path, 'bookmarks')
  t.deepEqual(query.str, base + 'bookmarks')
  query.path = 'pokpok'
  t.deepEqual(query.path, 'pokpok')
  t.deepEqual(query.str, base + 'pokpok')
})

test(`Query.make and set params - should make a query and let you set searchparams on it`, async t => {
  const query = Query.make()
  t.deepEqual(query.base, '')
  query.paramsObj.set('fields', 'name,url')
  query.paramsObj.set('sortby', 'name')
  t.deepEqual(query.params, 'fields=name,url&sortby=name')
  t.deepEqual(query.str, 'fields=name,url&sortby=name')
})

test(`Query.make and .meta - should make a new query with path + /.neomem`, async t => {
  const path = 'bookmarks'
  const query = Query.make(base, path)
  t.deepEqual(query.path, path)
  const metaquery = query.meta('pokpok')
  t.deepEqual(metaquery.path, path + '/.neomem/pokpok')
  t.is(metaquery.isMeta, true)
})

// test(`Query.make and .view - should make a new query with fields given by the view metadata`, async t => {
//   const path = 'bookmarks'
//   const query = Query.make(base, path)
//   t.deepEqual(query.path, path)
//   const view = { columns: [{ key: 'name' }, { key: 'url' }] }
//   const viewquery = query.view(view)
//   t.deepEqual(viewquery.path, path)
//   t.deepEqual(viewquery.paramsString, 'fields=name,url')
// })

// -------

// test(`Query.parseUrlObj()`, async t => {
//   const query = Query.parseUrlObj(base)
//   t.deepEqual(query.base, base)
// })

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
