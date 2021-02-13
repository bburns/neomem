// get, post, put, delete handlers

const fetch = require('node-fetch').default // mimics browser's fetch
const chalk = require('chalk') // color text
const { Query } = require('neomem-util')

// define nmdata endpoint
//. pass as parameter or use lib to find open port?
const baseUrl = 'http://localhost:4000/api/v1'

//. ask a datasource if the given path exists
async function exists(path) {
  // const query = { path, limit: 0 }
  // const json = await get(query)
  return true
}

/**
 * Get json from the given uri.
 * @param path { TPath }
 * @param metadata { Object } includes view
 * @returns json data
 */
async function get({ path, metadata }) {
  const query = Query.make({ path, metadata })
  const url = query.getUrl(baseUrl) // eg "http://localhost:4000/bookmarks?fields=name,url"
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip',
    },
  }
  console.log(chalk.gray(url))
  const response = await fetch(url, options)
  const json = await response.json()
  return json
}

const Data = {
  exists,
  get,
}

module.exports = { Data }
