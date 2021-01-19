// define commands

//. query fields and coldefs will come from the datasource metainfo

const fetchQuery = require('./fetchQuery')
const Table = require('./table')

async function list(args, uri) {
  const type = args[0] || 'node'
  // const query = `query { node { name, type, url, date_added, depth }}`
  // const query = `query { ${type} { name, notes, created, modified, depth }}`
  const query = `query { bookmarks(subquery:"query{node{name}}")}`
  console.log(query)
  const json = await fetchQuery(query, uri)
  console.log('json', json)
  const data = json.data.bookmarks.data
  console.log('data', data)
  const nodes = data.node
  const columns = [
    {
      name: 'Name',
      accessor: obj => ' '.repeat(obj.depth) + obj.name,
      width: 36,
    },
    { name: 'Type', accessor: 'type', width: 10 },
    { name: 'Notes', accessor: 'notes', width: 20 },
    { name: 'Created', accessor: 'created', width: 18 },
    { name: 'Modified', accessor: 'modified', width: 18 },
  ]
  const t = new Table(columns, nodes)
  const s = t.toString()
  console.log(s)
  console.log('done')
}

module.exports = { list }
