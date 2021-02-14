// get, post, put, delete handlers

const { Http } = require('neomem-util')
const { Config } = require('./config')

//. ask a datasource if the given path exists
async function exists({ path }) {
  // const query = { path, limit: 0 }
  // const json = await get(query)
  return true
}

/**
 * Get json from the given uri.
 * @returns json data
 */
async function get(query) {
  // const url = query.getUrl(Config.baseUrl) // eg "http://localhost:4000/bookmarks?fields=name,url"
  const url = query.getUrl()
  const json = await Http.get({ url })
  return json
}

const Data = {
  exists,
  get,
}

module.exports = { Data }
