const assert = require('assert').strict
const { data } = require('../src')

;(async function () {
  let query
  let items

  query = {}
  items = await data.get(query)
  console.log(items)
  assert(items === {})
})()
