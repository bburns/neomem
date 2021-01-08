const repl = require('repl')
const fetch = require('node-fetch')

async function fetchQuery(query, uri = 'http://localhost:4001') {
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

async function evalQuery(cmd, context, filename, callback) {
  const json = await fetchQuery(cmd)
  callback(null, json)
}

repl.start({ prompt: '> ', eval: evalQuery })
