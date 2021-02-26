// path functions

const pathlib = require('path') // node lib https://nodejs.org/api/path.html

//. currently Path class is just used as a namespace, but could use for objects also
class Path {
  /**
   * Get an absolute path object by joining parts.
   * eg join('/bookmarks', 'books/scif') => '/bookmarks/books/scifi'
   * eg join('/bookmarks', '/fishes') => '/fishes'
   * eg join('/bookmarks', '') => '/bookmarks'
   * @param parts {string[]}
   * @returns {string}
   */
  static join(...parts) {
    // see https://nodejs.org/api/path.html#path_path_resolve_paths
    // const str = pathlib.resolve('/', ...parts).slice(1) // remove leading '/'
    const hasAbsolute = parts.some(part => part.startsWith('/'))
    const str = hasAbsolute
      ? pathlib.resolve(...parts)
      : pathlib.join('/', ...parts).slice(1)
    return str
  }

  // static getFirst(path = '') {
  //   const i = path.indexOf('/', 1) //. skip first /
  //   if (i !== -1) {
  //     return path.slice(1, i) //. 1
  //   }
  //   return path.slice(1)
  // }

  // static getRest(path = '') {
  //   const i = path.indexOf('/', 1)
  //   if (i !== -1) {
  //     return path.slice(i)
  //   }
  //   return ''
  // }

  /**
   * Get first and rest of path
   * @param path {string}
   * @returns {Object}
   */
  static split(path = '') {
    let first
    let rest
    const i = path.indexOf('/', 1)
    if (i === -1) {
      first = path.slice(1)
      rest = ''
    } else {
      first = path.slice(1, i)
      rest = path.slice(i)
    }
    const parts = { first, rest }
    return parts
  }
}

module.exports = { Path }
