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
  t.deepEqual(query.str, '?fields=name,url&sortby=name')
})

test(`Query.make and .meta - should make a new query with path + /.neomem`, async t => {
  const path = 'bookmarks'
  const query = Query.make(base, path)
  t.deepEqual(query.path, path)
  const metaquery = query.meta('pokpok')
  t.deepEqual(metaquery.path, path + '/.neomem/pokpok')
  t.is(metaquery.isMeta, true)
})

test(`Query.make and .view - should make a new query with fields given by the view metadata`, async t => {
  const path = 'bookmarks'
  const query = Query.make(base, path)
  t.deepEqual(query.path, path)
  const view = { columns: [{ key: 'name' }, { key: 'url' }] }
  const viewquery = query.view(view)
  t.deepEqual(viewquery.path, path)
  t.deepEqual(viewquery.params, 'fields=name,url')
})

// -------

test('Query.makeFromRequest - should make from hapi request object', t => {
  // const base = 'http://localhost:4000/api/v1'
  const protocol = 'http'
  const host = 'localhost'
  const port = '4000'
  const apiversion = 'api/v1/'
  const path = '/bookmarks/books/scifi'
  const fullpath = apiversion + path
  const params = 'fields=name,type,url&depth=1&sortby=name'
  const url = protocol + '://' + host + ':' + port + fullpath + '?' + params
  const request = {
    server: {
      info: { protocol, host, port },
    },
    params: { path },
    raw: { req: { url } },
  }
  const query = Query.makeFromRequest(request, apiversion)
  t.deepEqual(query.path, path)
  t.deepEqual(query.params, params)
  t.deepEqual(query.params, 'fields=name,type,url&depth=1&sortby=name')
  t.deepEqual(query.paramsObj.get('depth'), '1')
  t.deepEqual(query.paramsObj.get('fields'), 'name,type,url')
  t.deepEqual(query.str, url)
})
