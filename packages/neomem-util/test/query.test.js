const test = require('ava')
const { Query } = require('../src')

test('keys', t => {
  const request = {
    params: { path: 'bookmarks' },
    raw: {
      req: {
        url:
          'localhost:4000/api/v1/bookmarks/books/scifi?fields=name,type,url&sortby=name',
      },
    },
  }
  const query = Query.make(request)
  t.deepEqual(query, {})
})
