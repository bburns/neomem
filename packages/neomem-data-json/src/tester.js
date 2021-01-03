const fetch = require('node-fetch')

async function tester(query, uri = 'http://localhost:4001') {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip',
    },
    body: JSON.stringify({ query }),
  }
  const response = await fetch(uri, options)
  const json = await response.json()
  return json
}

global.tester = tester
// module.exports = tester
