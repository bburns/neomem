const test = require('ava')
const { Data } = require('../src')
// const { Query } = require('neomem-util')

//. default to name,type,description and depth=0, so get root item.
test('get()', async t => {
  const item = await Data.get()
  t.deepEqual(item.name, 'neomem-data')
})

// test('get({})', async t => {
//   const query = {}
//   const items = await Data.get(query)
//   t.deepEqual(items, {})
// })

// test('get(Query.make())', async t => {
//   const query = Query.make()
//   const items = await Data.get(query)
//   t.deepEqual(items, {})
// })
