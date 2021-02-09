const test = require('ava')

const assert = require('assert').strict
const { Path } = require('../src')

test('foo', t => {
  t.pass()
  const path = Path.make('lkm', '/pok')
  t.is(path.string, '/pok')
})
