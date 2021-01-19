const fetch = require('node-fetch')

async function fetchQuery(query, uri) {
  const body = { query: query }
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip',
    },
    body: JSON.stringify(body),
  }
  const response = await fetch(uri, options)
  const json = await response.json()
  return json
}

module.exports = fetchQuery
