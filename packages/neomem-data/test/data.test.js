const test = require('ava')
const { Data } = require('../src')
const { Query } = require('neomem-util')

// default to name,type,description and depth=0, so get root item.
test('get()', async t => {
  const item = await Data.get()
  t.deepEqual(item.name, 'neomem-data')
})

test('get(empty query)', async t => {
  const query = Query.make()
  const item = await Data.get(query)
  t.deepEqual(item.name, 'neomem-data')
})

test('get(Query.makeFromUrl(url))', async t => {
  const url =
    'http://localhost:4000/bookmarks?fields=name,url&sortby=name&depth=1'
  const query = Query.makeFromUrl(url)
  const items = await Data.get(query)
  t.deepEqual(items.map(item => item.name).sort(), [
    'bookmarks',
    'filesys',
    'neo4j',
  ])
})
