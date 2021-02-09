const test = require('ava')
const { Path } = require('../src')

test(`make()`, async t => {
  const path = Path.make()
  t.deepEqual(path, {
    string: '',
    array: [''],
    first: '',
    rest: [],
    restString: '',
  })
})

test('go /filesys', t => {
  const path = Path.make('/bookmarks', '/filesys')
  t.deepEqual(path, {
    string: 'filesys',
    array: ['filesys'],
    first: 'filesys',
    rest: [],
    restString: '',
  })
})

test('go books/scifi', t => {
  const path = Path.make('/bookmarks', 'books/scifi')
  t.deepEqual(path, {
    string: 'bookmarks/books/scifi',
    array: ['bookmarks', 'books', 'scifi'],
    first: 'bookmarks',
    rest: ['books', 'scifi'],
    restString: 'books/scifi',
  })
})

test('go', t => {
  const path = Path.make('/bookmarks')
  t.deepEqual(path, {
    string: 'bookmarks',
    array: ['bookmarks'],
    first: 'bookmarks',
    rest: [],
    restString: '',
  })
})
