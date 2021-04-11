// path functions

import libpath from 'path' // node lib https://nodejs.org/api/path.html

//. currently Path class is just used as a namespace, but could use for objects also
class Path {
  /**
   * Get an absolute path object by joining parts.
   * eg join('/bookmarks', 'books/scif') => '/bookmarks/books/scifi'
   * eg join('/bookmarks', '/fishes') => '/fishes'
   * eg join('/bookmarks', '') => '/bookmarks'
   * @param {string[]} parts
   * @returns {string}
   */
  static join(...parts) {
    // see https://nodejs.org/api/path.html#path_path_resolve_paths
    // const str = libpath.resolve('/', ...parts).slice(1) // remove leading '/'
    const hasAbsolute = parts.some(part => part.startsWith('/'))
    const str = hasAbsolute
      ? libpath.resolve(...parts)
      : libpath.join('/', ...parts).slice(1)
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
   * @param {string} path
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

  /**
   * up
   * move up along path tree
   * @param {string} path
   */
  static up(path) {
    const str = libpath.resolve(path, '..')
    return str
  }
}

export { Path }
