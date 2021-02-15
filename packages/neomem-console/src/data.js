// get, post, put, delete handlers

const { Http } = require('neomem-util')

//. ask a datasource if the given path exists
async function exists({ path }) {
  // const query = { path, limit: 0 }
  // const json = await get(query)
  return true
}

/**
 * Get json from the given query
 * @param query {TQuery}
 * @returns {Object} json data
 */
async function get(query) {
  const url = query.url
  const json = await Http.get({ url })
  return json
}

const Data = {
  exists,
  get,
}

module.exports = { Data }
