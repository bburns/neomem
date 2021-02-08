const pathLib = require('path') // node lib https://nodejs.org/api/path.html

class Path {
  constructor() {
    throw new Error('Use Path.make fn')
  }
  // get absolute path from names and current absolute location.
  // eg names = 'books/scif', location = '/bookmarks' => '/bookmarks/books/scifi'
  // eg names = '/neo4j', location = '/bookmarks' => '/neo4j'
  // eg names = '', location = '/bookmarks' => '/bookmarks'
  static make(names = '', location = '') {
    const dest = names || ''
    const string = dest.startsWith('/')
      ? dest
      : dest
      ? pathLib.join(location, dest)
      : location
    // const get = () => string
    // return { get, set }
    const array = string.split('/') // eg ['books', 'scifi']
    const first = array[0] // eg 'books'
    const rest = array.slice(1) // eg ['scifi']
    const restString = rest.join('/')
    const path = { string, array, first, rest, restString }
    return path
  }
}

//. make path an object with different parts and methods

// const path = request.params.path || '' // eg 'books/scifi'
// const pathArray = path.split('/') // eg ['books', 'scifi']
// const firstOfPath = pathArray[0] // eg 'books'
// const restOfPath = pathArray.slice(1).join('/') // eg 'scifi'

module.exports = { Path }
