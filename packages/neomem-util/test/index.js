const assert = require('assert').strict
const util = require('../src')

let path
path = util.Path('lkm', '/pok')
assert.equal(path, '/pok/lkm')
