const assert = require('assert').strict
const { data } = require('../src')

let query
let items

query = {}
items = await data.get(query)
assert.deepEquals(items, [])
