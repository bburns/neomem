const test = require('ava')
const { Path } = require('../src')

// note: we simulate how Path is used - first argument is always
// location, which is an absolute path.

test('go /filesys', t => {
  const path = Path.make('/bookmarks', '/filesys')
  t.deepEqual(path, {
    string: '/filesys',
    array: ['', 'filesys'], //.
    first: '', //.
    rest: ['filesys'],
    restString: 'filesys',
  })
})

test('go books/scifi', t => {
  const path = Path.make('/bookmarks', 'books/scifi')
  t.deepEqual(path, {
    string: '/bookmarks/books/scifi',
    array: ['', 'bookmarks', 'books', 'scifi'], //.
    first: '', //.
    rest: ['bookmarks', 'books', 'scifi'],
    restString: 'bookmarks/books/scifi',
  })
})

test('go', t => {
  const path = Path.make('/bookmarks')
  t.deepEqual(path, {
    string: '/bookmarks',
    array: ['', 'bookmarks'], //.
    first: '', //.
    rest: ['bookmarks'],
    restString: 'bookmarks',
  })
})
