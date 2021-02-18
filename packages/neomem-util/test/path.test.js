const test = require('ava').default
const { Path } = require('../src')

test(`Path.make - handle abs path`, async t => {
  const path = Path.make('/pok/lkm')
  t.deepEqual(path.str, '/pok/lkm')
  t.deepEqual(path.first, '')
  t.deepEqual(path.rest, 'pok/lkm')
})

test(`Path.make - handle rel path`, async t => {
  const path = Path.make('pok/lkm')
  t.deepEqual(path.str, 'pok/lkm')
  t.deepEqual(path.first, 'pok')
  t.deepEqual(path.rest, 'lkm')
})

test(`Path.join - should join two rel paths`, async t => {
  const path = Path.join('pok', 'lkm')
  t.deepEqual(path.str, 'pok/lkm')
})

test(`Path.join - should join abs + rel paths`, async t => {
  const path = Path.join('/pok', 'lkm')
  t.deepEqual(path.str, '/pok/lkm')
})

test(`Path.join - should handle two abs paths`, async t => {
  const path = Path.join('/pok', '/lkm')
  t.deepEqual(path.str, '/lkm')
})

test(`Path.join - should handle rel + abs path`, async t => {
  const path = Path.join('pok', '/lkm')
  t.deepEqual(path.str, '/lkm')
})

test(`Path.join - handle empty`, async t => {
  const path = Path.join()
  t.deepEqual(path.str, '')
})

test(`Path.join - handle abs path`, async t => {
  const path = Path.join('/pok')
  t.deepEqual(path.str, '/pok')
})

test(`Path.join - handle relative path`, async t => {
  const path = Path.join('lkm')
  t.deepEqual(path.str, 'lkm')
})
