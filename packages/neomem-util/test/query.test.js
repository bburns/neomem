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
  t.deepEqual(query.url, '?' + encode({}))
})

test(`Query.make(base) - should make a query that is updateable`, async t => {
  const query = Query.make(base)
  t.deepEqual(query.base, base)
  query.params.path = 'bookmarks'
  t.deepEqual(query.params.path, 'bookmarks')
  t.deepEqual(query.url, base + '?' + encode({ path: 'bookmarks' }))
})

test(`Query.make and set params - should make a query and let you set searchparams on it`, async t => {
  const query = Query.make()
  const params = { fields: 'name,url', sortby: 'name' }
  query.params = params
  t.deepEqual(query.params, params)
  t.deepEqual(query.url, '?' + encode(params))
})

test(`Query.make and .meta - should make a new query`, async t => {
  const params = { path: 'bookmarks' }
  const query = Query.make(base, params)
  // const metaquery = query.getMetaQuery('pokpok')
  const metaquery = query.with({ meta: 1 })
  t.assert(query !== metaquery)
  t.deepEqual(metaquery.params.meta, 1)
  // t.deepEqual(metaquery.isMeta, true)
})

test(`Query.make and .view - should make a new query with fields given by the view metadata`, async t => {
  const params = { path: 'bookmarks' }
  const query = Query.make(base, params)
  const view = { columns: [{ key: 'name' }, { key: 'url' }] }
  const metadata = { view }
  // const viewquery = query.getViewQuery(metadata).set('depth', 0)
  const viewquery = query.with({ depth: 0 })
  const params2 = { ...params, fields: 'name,url', depth: 0 }
  t.deepEqual(viewquery.params, params2)
  t.deepEqual(viewquery.url, base + '?' + encode(params2))
})

// // -------

test('Query.makeFromRequest - should make from hapi request object', t => {
  const protocol = 'http'
  const host = 'localhost'
  const port = '4000'
  const base = protocol + '://' + host + ':' + port
  const apiversion = '/api/v1/'
  const path = 'bookmarks/books/scifi'
  const params = { path, fields: 'name,type', depth: 1 }
  const url = base + apiversion + '?' + encode(params)
  const request = {
    server: {
      info: { protocol, host, port },
    },
    params: { path },
    raw: { req: { url } },
  }
  const query = Query.makeFromRequest(request, apiversion)
  t.deepEqual(query.params, params)
  t.deepEqual(query.params.path, path)
  t.deepEqual(query.params.fields, 'name,type')
  t.deepEqual(query.params.depth, 1)
  t.deepEqual(query.url, url)
})
