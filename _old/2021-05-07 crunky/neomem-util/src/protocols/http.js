// get, post, put, delete handlers

import fetch from 'node-fetch' // mimics browser's fetch
// import chalk from 'chalk' // color text

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
  // console.log(21, 'http.get url:', url)
  const response = await fetch(url, options)
  const json = await response.json()
  return json
}

const Http = {
  get,
}

export { Http }
