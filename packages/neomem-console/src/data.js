// get, post, put, delete handlers

const { Http } = require('neomem-util')

/** @typedef {import('../../neomem-util').Query} Query */

//. ask a datasource if the given path exists
//. better - make an exists query - Query.makeExists(base, path) then use get(query)?
async function exists({ path }) {
  // const query = { path, limit: 0 }
  // const json = await get(query)
  return true
}

/**
 * Get json from the given query
 * @param query {Query}
 * @returns {Promise<Object>} json data
 */
async function get(query) {
  console.log('query url 21', query.url)
  const json = await Http.get(query.url)
  return json
}

const Data = {
  exists,
  get,
}

module.exports = { Data }
