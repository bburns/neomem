// get, post, put, delete handlers

const fetch = require('node-fetch').default // mimics browser's fetch
const chalk = require('chalk').default // color text

/**
 * Get json from the given url.
 * //. could pass desired datatype - json/html/text - and handle appropriately
 * @param url {string} a string like 'http://localhost:4000/bookmarks?fields=name'
 * @returns {Promise<Object>} json data
 */
async function get(url) {
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip',
    },
  }
  // console.log(chalk.gray(url))
  console.log(21, 'http.get', url)
  const response = await fetch(url, options)
  const json = await response.json()
  return json
}

const Http = {
  get,
}

module.exports = { Http }
