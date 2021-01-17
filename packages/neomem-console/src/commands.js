const fetchQuery = require('./fetchQuery')
const Table = require('./table')

async function list() {
  const query = `query { node { name, type, url, date_added, depth }}`
  const json = await fetchQuery(query)
  const nodes = json.data.node
  const columns = [
    {
      name: 'Name',
      accessor: obj => ' '.repeat(obj.depth) + obj.name,
      width: 36,
    },
    { name: 'Type', accessor: 'type', width: 8 },
    { name: 'Url', accessor: 'url', width: 20 },
    { name: 'Date Added', accessor: 'date_added', width: 30 },
  ]
  const t = new Table(columns, nodes)
  const s = t.toString()
  console.log(s)
}

module.exports = { list }
