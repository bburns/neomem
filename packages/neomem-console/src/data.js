// get, post, put, delete handlers

const { Http } = require('neomem-util')
const chalk = require('chalk')

/****************************************************** @typedef {import('../../neomem-util').Query} Query *****************************************************/

/******************************************************
 * Ask a datasource if the given path exists
 *****************************************************/
//. should be able to just get 200 or 404 from a header fetch?
async function exists({ path }) {
  // const query = { path, limit: 0 }
  // const json = await get(query)
  return true
}

/******************************************************
 * Get json from the given query
 * @param query {Query}
 * @returns {Promise<Object>} json data
 *****************************************************/
async function get(query) {
  console.log(chalk.gray(query.str))
  const json = await Http.get(query.url)
  return json
}

const Data = {
  exists,
  get,
}

module.exports = { Data }
