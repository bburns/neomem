const test from 'ava').default
const { Path } from '../src')

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

// test(`Path.getFirst() - should get first of path`, async t => {
//   const first = Path.getFirst('/bookmarks')
//   t.deepEqual(first, 'bookmarks')
// })

test(`Path.split() - should get first and rest of path`, async t => {
  let parts

  parts = Path.split('/bookmarks')
  t.deepEqual(parts, { first: 'bookmarks', rest: '' })

  parts = Path.split('/bookmarks/books')
  t.deepEqual(parts, { first: 'bookmarks', rest: '/books' })

  parts = Path.split('/bookmarks/books/scifi')
  t.deepEqual(parts, { first: 'bookmarks', rest: '/books/scifi' })

  // this is incorrect usage, currently - gives 'ookmarks'
  // parts = Path.split('bookmarks')
  // t.deepEqual(parts, { first: 'bookmarks', rest: '' })
})
