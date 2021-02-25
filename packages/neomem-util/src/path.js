// path functions

const pathlib = require('path') // node lib https://nodejs.org/api/path.html

/**
 * A path object lets you break down a path like '/bookmarks/books/scifi'
 * into its component parts when needed.
 */
class Path {
  constructor(str = '') {
    this._str = str
  }

  /**
   * Make a path object
   * @param str {string} a path string eg '/bookmarks/books'
   */
  static make(str = '') {
    const pathObj = new Path(str)
    return pathObj
  }

  /**
   * Get an absolute path object by joining parts.
   * e.g. join('/foo', 'bar') == join('/foo/bar')
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
    // const pathObj = Path.make(str)
    // return pathObj
    return str
  }

  // /**
  //  * Return first part of path up to slash
  //  * @returns {string}
  //  */
  // get first() {
  //   const i = this._str.indexOf('/')
  //   if (i !== -1) {
  //     return this._str.slice(0, i)
  //   }
  //   return this._str
  // }

  static getFirst(path = '') {
    const i = path.indexOf('/', 1) //. skip first /
    if (i !== -1) {
      // found
      return path.slice(1, i) //. 1
    }
    return path.slice(1)
  }

  // /**
  //  * Return rest of path past slash
  //  * @returns {string}
  //  */
  // get rest() {
  //   const i = this._str.indexOf('/', 1)
  //   if (i !== -1) {
  //     return this._str.slice(i + 1)
  //   }
  //   return ''
  // }

  static getRest(path = '') {
    const i = path.indexOf('/', 1)
    if (i !== -1) {
      return path.slice(i + 1)
    }
    return ''
  }

  toString() {
    return this._str
  }
  get str() {
    return this._str
  }
}

module.exports = { Path }
