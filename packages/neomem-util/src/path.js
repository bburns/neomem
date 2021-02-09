const pathLib = require('path') // node lib https://nodejs.org/api/path.html

// get absolute path by joining parts
// eg make('/bookmarks', 'books/scif') => { string: '/bookmarks/books/scifi', ... }
// eg make('/bookmarks', '/fishes') => { string: '/fishes', ... }
// eg make('/bookmarks', '') => { string: '/bookmarks', ... }
function make(...parts) {
  console.log(parts)
  // see https://nodejs.org/api/path.html#path_path_resolve_paths
  const string = pathLib.resolve('/', ...parts).slice(1) // remove leading /
  const array = string.split('/') // eg ['bookmarks', 'books']
  const first = array[0] // eg 'bookmarks'
  const rest = array.slice(1) // eg ['books']
  const restString = rest.join('/') // eg 'books'
  const path = { string, array, first, rest, restString }
  return path
}

const Path = {
  make,
}

module.exports = { Path }
