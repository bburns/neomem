const fetch = require('node-fetch')

const uri = 'http://localhost:4102'
console.log('uri', uri)

async function fetchQuery(query) {
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

module.exports = fetchQuery
