const assert = require('assert').strict
const { Path } = require('../src')

let path
path = Path.make('lkm', '/pok')
assert.equal(path.string, '/pok')
