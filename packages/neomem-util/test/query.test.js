const test = require('ava').default
const pathlib = require('path') // node lib
const { Query } = require('../src')

const base = 'http://localhost:4000/api/v1/'

function encode(obj) {
  return encodeURIComponent(JSON.stringify(obj))
}
function decode(s) {
  return JSON.parse(decodeURIComponent(s))
}

test(`Query.make() - should let you make an empty query`, async t => {
  const query = Query.make()
  t.deepEqual(query.base, '')
  t.deepEqual(query.params, {})
  t.deepEqual(query.str, '?' + encode({}))
})

test(`Query.make(base) - should make a query that is updateable`, async t => {
  const query = Query.make(base)
  t.deepEqual(query.base, base)
  query.params.path = 'bookmarks'
  t.deepEqual(query.params.path, 'bookmarks')
  t.deepEqual(query.str, base + '?' + encode({ path: 'bookmarks' }))
})

test(`Query.make and set params - should make a query and let you set searchparams on it`, async t => {
  const query = Query.make()
  const params = { fields: 'name,url', sortby: 'name' }
  query.params = params
  t.deepEqual(query.params, params)
  t.deepEqual(query.str, '?' + encode(params))
})

test(`Query.make and .meta - should make a new query with path + .neomem`, async t => {
  const params = { path: 'bookmarks' }
  const query = Query.make(base, params)
  const metaquery = query.getMetaQuery('pokpok')
  t.deepEqual(metaquery.isMeta, true)
})

test(`Query.make and .view - should make a new query with fields given by the view metadata`, async t => {
  const params = { path: 'bookmarks' }
  const query = Query.make(base, params)
  const view = { columns: [{ key: 'name' }, { key: 'url' }] }
  const viewquery = query.getViewQuery(view).set('depth', 0)
  const params2 = { ...params, depth: 0 }
  t.deepEqual(viewquery.params, params2)
  t.deepEqual(viewquery.str, base + '?' + encode(params2))
})

// // -------

// test('Query.makeFromRequest - should make from hapi request object', t => {
//   const protocol = 'http'
//   const host = 'localhost'
//   const port = '4000'
//   const apiversion = 'api/v1/'
//   const path = 'bookmarks/books/scifi'
//   const fullpath = apiversion + path
//   const params = 'fields=name,type,url&depth=1&sortby=name'
//   const url = protocol + '://' + host + ':' + port + fullpath + '?' + params
//   const request = {
//     server: {
//       info: { protocol, host, port },
//     },
//     params: { path },
//     raw: { req: { url } },
//   }
//   const query = Query.makeFromRequest(request, apiversion)
//   t.deepEqual(query.path, path)
//   t.deepEqual(query.params, params)
//   t.deepEqual(query.paramsObj.get('fields'), 'name,type,url')
//   t.deepEqual(query.paramsObj.get('depth'), '1')
//   t.deepEqual(query.str, url)
// })
