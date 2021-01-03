const fetch = require('node-fetch')

async function tester(url, query) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip',
    },
    body: JSON.stringify({ query }),
  }
  const response = await fetch(url, options)
  const json = await response.json()
  return json
}

module.exports = tester
