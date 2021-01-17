// neomem-console

// this repl (read-eval-print-loop) will translate from english-like language
// to graphql queries, and format the results nicely.
// currently just lets you enter a graphql query directly.

const repl = require('repl')
const fetch = require('node-fetch')
const Table = require('easy-table')

// const prompt = '|> '
const prompt = '[neomem] > '
const uri = 'http://localhost:4101'

repl.start({ prompt, eval: evalCommand })

async function evalCommand(cmd, context, filename, callback) {
  const query = `query { node { name, type, guid, url, date_added, date_modified }}`
  const json = await fetchQuery(query)
  const nodes = json.data.node
  // const s = JSON.stringify(nodes)
  const t = new Table()
  nodes.forEach(node => {
    t.cell('Name', node.name)
    t.cell('Type', node.type)
    t.cell('Url', node.url)
    t.cell('Date Added', node.date_added)
    t.cell('Date Modified', node.date_modified)
    // t.cell('Guid', node.guid)
    t.newRow()
  })
  const s = t.toString()
  const error = null
  callback(error, s)
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
