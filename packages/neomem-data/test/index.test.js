const test = require('ava')

// note: can't have top-level await unless type:module and import
// const assert = require('assert').strict
const { Data } = require('../src')

// ;(async function () {
//   let query
//   let items
//   query = {}
//   items = await data.get(query)
//   assert(items === {})
// })()

test('foo', t => {
  t.pass()
})
