const assert = require('assert').strict
const data = require('../src/data')

const query = { path: '' }
const items = data.get(query)
assert.deepEquals(items, [])
