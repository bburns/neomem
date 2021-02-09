const test = require('ava')
const { Data } = require('../src')
const { Query } = require('neomem-util')

//. should this just get the root object? i guess so
test('get()', async t => {
  const items = await Data.get()
  t.deepEqual(items, undefined)
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
