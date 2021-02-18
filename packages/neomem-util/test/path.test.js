const test = require('ava').default
const { Path } = require('../src')

test(`Path.join - should join two plain paths`, async t => {
  const path = Path.join('pok', 'lkm')
  t.deepEqual(path.str, 'pok/lkm')
})

test(`Path.join - should join abs + plain paths`, async t => {
  const path = Path.join('/pok', 'lkm')
  t.deepEqual(path.str, '/pok/lkm')
})

test(`Path.join - should handle two abs paths`, async t => {
  const path = Path.join('/pok', '/lkm')
  t.deepEqual(path.str, '/lkm')
})

test(`Path.join - should handle plain + abs path`, async t => {
  const path = Path.join('pok', '/lkm')
  t.deepEqual(path.str, '/lkm')
  // t.deepEqual(path, Path.parse('/lkm'))
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
// // will need to be able to extend a path
// // how does node's path lib do it? path.join?
// test(`join .neomem`, async t => {
//   const path = Path.make('/bookmarks')
//   // const path2 = path.join('.neomem')
//   // path.addTarget('.neomem')
//   t.deepEqual(1, 1)
// })
