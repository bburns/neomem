const pathLib = require('path') // node lib https://nodejs.org/api/path.html

// get absolute path by joining parts
// eg make('/bookmarks', 'books/scif') => { string: '/bookmarks/books/scifi', ... }
// eg make('/bookmarks', '/fishes') => { string: '/fishes', ... }
function make(...parts) {
  // const dest = names || ''
  // const string = dest.startsWith('/')
  //   ? dest
  //   : dest
  //   ? pathLib.join(location, dest)
  //   : location
  // see https://nodejs.org/api/path.html#path_path_resolve_paths
  const string = pathLib.resolve(...parts)
  const array = string.split('/') // eg ['books', 'scifi']
  const first = array[0] // eg 'books'
  const rest = array.slice(1) // eg ['scifi']
  const restString = rest.join('/') // eg 'scifi'
  const path = { string, array, first, rest, restString }
  return path
}

const Path = {
  make,
}

module.exports = { Path }
