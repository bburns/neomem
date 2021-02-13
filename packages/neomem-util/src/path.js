// path objects

/**
 * A path object breaks down a path like '/bookmarks/books/scifi'
 * into its component parts.
 * The components are dictated by what the app needs...
 * @typedef {Object} TPath
 * @property {string} str
 * @property {string[]} array
 * @property {string} first
 * @property {string[]} rest
 * @property {string} restString
 */

const pathLib = require('path') // node lib https://nodejs.org/api/path.html

/**
 * Get an absolute path object by joining parts.
 * eg make('/bookmarks', 'books/scif') => { str: '/bookmarks/books/scifi', ... }
 * eg make('/bookmarks', '/fishes') => { str: '/fishes', ... }
 * eg make('/bookmarks', '') => { str: '/bookmarks', ... }
 * @param parts {string[]}
 * @returns {TPath}
 */
function make(...parts) {
  // see https://nodejs.org/api/path.html#path_path_resolve_paths
  const str = pathLib.resolve('/', ...parts).slice(1) // remove leading '/'
  const array = str.split('/') // eg ['bookmarks', 'books']
  const first = array[0] // eg 'bookmarks'
  const rest = array.slice(1) // eg ['books']
  const restString = rest.join('/') // eg 'books'
  const path = {
    str,
    array,
    first,
    rest,
    restString,
    add: suffix => make(...parts, suffix),
  }
  return path
}

const Path = {
  make,
}

module.exports = { Path }
