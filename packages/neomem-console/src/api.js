// get, post, put, delete handlers

const fetch = require('node-fetch') // mimics browser's fetch
const chalk = require('chalk') // color text

// define nmdata endpoint
//. pass as parameter or use lib to find open port?
const baseUrl = 'http://localhost:4000/api/v1'

//. ask a datasource if the given path exists
async function exists(path) {
  // const query = { path, limit: 0 }
  // const json = await get(query)
  return true
}

// get json from the given uri
async function get(query) {
  const s = `${query.path}?${query.paramsString}`
  const url = baseUrl + s
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

module.exports = { exists, get }
