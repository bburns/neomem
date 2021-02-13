const test = require('ava').default
const { Url } = require('../src')

test(`a`, async t => {
  const url = Url.make(
    'http://localhost:4000/bookmarks/books?fields=name,type&sortby=name'
  )
  t.deepEqual(url.hostname, 'localhost')
})
