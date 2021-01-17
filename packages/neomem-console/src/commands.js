const fetch = require('node-fetch')
const Table = require('easy-table')

const uri = 'http://localhost:4101'

async function list() {
  const query = `query { node { name, type, guid, url, date_added, date_modified }}`
  const json = await fetchQuery(query)
  const nodes = json.data.node
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
  // const s = t.printTransposed()
  console.log(s)
}

async function compare() {
  const query = `query { node { name, type, guid, url, date_added, date_modified }}`
  const json = await fetchQuery(query)
  const nodes = json.data.node
  const t = new Table()
  nodes.forEach(node => {
    t.cell('Name', node.name)
    t.cell('Type', node.type)
    t.cell('Url', node.url)
    t.cell('Date Added', node.date_added)
    t.cell('Date Modified', node.date_modified)
    t.cell('Guid', node.guid)
    t.newRow()
  })
  // const s = t.toString()
  const s = t.printTransposed()
  console.log(s)
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

module.exports = { list, compare }
