const test = require('ava').default
const { Path } = require('../src')

test(`make()`, async t => {
  const path = Path.make()
  t.like(path, {
    str: '',
    array: [''],
    first: '',
    rest: [],
    restString: '',
  })
})

test('eg go /filesys', t => {
  const path = Path.make('/bookmarks', '/filesys')
  t.like(path, {
    str: 'filesys',
    array: ['filesys'],
    first: 'filesys',
    rest: [],
    restString: '',
  })
})

test('eg go books/scifi', t => {
  const path = Path.make('/bookmarks', 'books/scifi')
  t.like(path, {
    str: 'bookmarks/books/scifi',
    array: ['bookmarks', 'books', 'scifi'],
    first: 'bookmarks',
    rest: ['books', 'scifi'],
    restString: 'books/scifi',
  })
})

test('eg go', t => {
  const path = Path.make('/bookmarks')
  t.like(path, {
    str: 'bookmarks',
    array: ['bookmarks'],
    first: 'bookmarks',
    rest: [],
    restString: '',
  })
})

// will need to be able to extend a path
// how does node's path lib do it? path.join?
test(`join .neomem`, async t => {
  const path = Path.make('/bookmarks')
  // const path2 = path.join('.neomem')
  // path.addTarget('.neomem')
  t.deepEqual(1, 1)
})
