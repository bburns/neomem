const test = require('ava').default
const { Url } = require('../src')

test(`a`, async t => {
  const urlobj = new Url(
    'http://localhost:4000/bookmarks/books?fields=name,type&sortby=name'
  )
  t.deepEqual(1, 1)
})
