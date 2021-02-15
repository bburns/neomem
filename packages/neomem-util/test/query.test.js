const test = require('ava').default
const { Query } = require('../src')

const base = 'http://localhost:4000/api/v1'

test(`Query.make() - an empty query`, async t => {
  const query = Query.make()
  t.deepEqual(query.base, '')
  t.deepEqual(query.path, '')
  t.deepEqual(query.url, '')
})

test(`Query.make({base}) and update`, async t => {
  // should make a query that is updateable
  const query = Query.make({ base })
  t.deepEqual(query.base, base)
  query.update({ path: 'bookmarks' })
  t.deepEqual(query.path, 'bookmarks')
  t.deepEqual(query.url, base + '/bookmarks')
  query.path = 'pokpok'
  t.deepEqual(query.path, 'pokpok')
  t.deepEqual(query.url, base + '/pokpok')
})

test(`Query.make and .meta`, async t => {
  // should make a new query with path + /.neomem
  const path = 'bookmarks'
  const query = Query.make({ base, path })
  t.deepEqual(query.path, path)
  const q2 = query.meta()
  t.deepEqual(q2.path, path + '/.neomem')
})

test(`Query.make and .view`, async t => {
  // should make a new query with fields given by the view metadata
  const path = 'bookmarks'
  const query = Query.make({ base, path })
  t.deepEqual(query.path, path)
  const view = { columns: [{ key: 'name' }, { key: 'url' }] }
  const q2 = query.view(view)
  console.log(q2)
  t.deepEqual(q2.path, path)
  t.deepEqual(q2.paramsString, 'fields=name,url')
})

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
