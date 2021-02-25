const test = require('ava').default
const { Path } = require('../src')

test(`Path.join - should join two rel paths`, async t => {
  const path = Path.join('pok', 'lkm')
  t.deepEqual(path, 'pok/lkm')
})

test(`Path.join - should join abs + rel paths`, async t => {
  const path = Path.join('/pok', 'lkm')
  t.deepEqual(path, '/pok/lkm')
})

test(`Path.join - should handle two abs paths`, async t => {
  const path = Path.join('/pok', '/lkm')
  t.deepEqual(path, '/lkm')
})

test(`Path.join - should handle rel + abs path`, async t => {
  const path = Path.join('pok', '/lkm')
  t.deepEqual(path, '/lkm')
})

test(`Path.join - should handle empty path`, async t => {
  const path = Path.join()
  t.deepEqual(path, '')
})

test(`Path.join - should handle abs path`, async t => {
  const path = Path.join('/pok')
  t.deepEqual(path, '/pok')
})

test(`Path.join - should handle relative path`, async t => {
  const path = Path.join('lkm')
  t.deepEqual(path, 'lkm')
})

test(`Path.getFirst() - should get first of path`, async t => {
  const first = Path.getFirst('/bookmarks')
  t.deepEqual(first, 'bookmarks')
})
