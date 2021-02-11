const test = require('ava').default
const { Path } = require('../src')

test(`make()`, async t => {
  const path = Path.make()
  t.deepEqual(path, {
    str: '',
    array: [''],
    first: '',
    rest: [],
    restString: '',
  })
})

test('go /filesys', t => {
  const path = Path.make('/bookmarks', '/filesys')
  t.deepEqual(path, {
    str: 'filesys',
    array: ['filesys'],
    first: 'filesys',
    rest: [],
    restString: '',
  })
})

test('go books/scifi', t => {
  const path = Path.make('/bookmarks', 'books/scifi')
  t.deepEqual(path, {
    str: 'bookmarks/books/scifi',
    array: ['bookmarks', 'books', 'scifi'],
    first: 'bookmarks',
    rest: ['books', 'scifi'],
    restString: 'books/scifi',
  })
})

test('go', t => {
  const path = Path.make('/bookmarks')
  t.deepEqual(path, {
    str: 'bookmarks',
    array: ['bookmarks'],
    first: 'bookmarks',
    rest: [],
    restString: '',
  })
})
