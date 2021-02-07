const pathLib = require('path') // node lib https://nodejs.org/api/path.html

// get absolute path from names and current absolute location.
// eg names = 'books/scif', location = '/bookmarks' => '/bookmarks/books/scifi'
// eg names = '/neo4j', location = '/bookmarks' => '/neo4j'
// eg names = '', location = '/bookmarks' => '/bookmarks'
module.exports = function getPath(names, location) {
  console.log('getPath', names, location)
  const dest = names || ''
  const path = dest.startsWith('/')
    ? dest
    : dest
    ? pathLib.join(location, dest)
    : location
  return path
}
