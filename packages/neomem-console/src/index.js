// neomem-console
// this repl (read-eval-print-loop) will translate from english-like language
// to graphql queries, and format the results nicely.
// currently just lets you enter a graphql query directly.

const repl = require('repl')
const fetch = require('node-fetch')

const prompt = '|> '
const uri = 'http://localhost:4101'

repl.start({ prompt, eval: evalCommand })

async function evalCommand(cmd, context, filename, callback) {
  const query = `query { node { name, type, guid, url, date_added }}`
  const json = await fetchQuery(query)
  const s = JSON.stringify(json)
  callback(null, s)
}

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
