// path objects

const pathlib = require('path') // node lib https://nodejs.org/api/path.html

/**
 * A path object lets you break down a path like '/bookmarks/books/scifi'
 * into its component parts when needed.
 */
class Path {
  constructor(str = '') {
    // throw new Error(`Use Path.make or Path.join`)
    this._str = str
  }

  /**
   * Make a path object
   * @param str {string} a path string eg '/bookmarks/books'
   */
  static make(str = '') {
    const path = new Path(str)
    return path
  }

  /**
   * Get an absolute path object by joining parts.
   * e.g. join('/foo', 'bar') == join('/foo/bar')
   * eg make('/bookmarks', 'books/scif') => { str: '/bookmarks/books/scifi', ... }
   * eg make('/bookmarks', '/fishes') => { str: '/fishes', ... }
   * eg make('/bookmarks', '') => { str: '/bookmarks', ... }
   * @param parts {string[]}
   */
  static join(...parts) {
    // see https://nodejs.org/api/path.html#path_path_resolve_paths
    // const str = pathlib.resolve('/', ...parts).slice(1) // remove leading '/'
    const hasAbsolute = parts.some(part => part.startsWith('/'))
    const str = hasAbsolute
      ? pathlib.resolve(...parts)
      : pathlib.join('/', ...parts).slice(1)
    const path = Path.make(str)
    return path
  }

  /**
   * Return first part of path up to slash
   */
  get first() {
    const i = this._str.indexOf('/')
    if (i !== -1) {
      return this._str.slice(0, i)
    }
    return this._str
  }

  /**
   * Return rest of path past slash
   */
  get rest() {
    const i = this._str.indexOf('/')
    if (i !== -1) {
      return this._str.slice(i + 1)
    }
    return ''
  }

  toString() {
    return this._str
  }

  get str() {
    return this.toString()
  }
}

module.exports = { Path }
