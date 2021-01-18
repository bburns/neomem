const fetchQuery = require('./fetchQuery')
const Table = require('./table')

// async function listBookmarks() {
//   const query = `query { node { name, type, url, date_added, depth }}`
//   const json = await fetchQuery(query)
//   const nodes = json.data.node
//   const columns = [
//     {
//       name: 'Name',
//       accessor: obj => ' '.repeat(obj.depth) + obj.name,
//       width: 36,
//     },
//     { name: 'Type', accessor: 'type', width: 8 },
//     { name: 'Url', accessor: 'url', width: 30 },
//     { name: 'Date Added', accessor: 'date_added', width: 20 },
//   ]
//   const t = new Table(columns, nodes)
//   const s = t.toString()
//   console.log(s)
// }

async function list() {
  const query = `query { Node { name, notes, created, modified, depth }}`
  console.log(query)
  const json = await fetchQuery(query)
  console.log(json)
  const nodes = json.data.Node
  const columns = [
    {
      name: 'Name',
      accessor: obj => ' '.repeat(obj.depth) + obj.name,
      width: 36,
    },
    { name: 'Notes', accessor: 'notes', width: 30 },
    { name: 'Created', accessor: 'created', width: 20 },
    { name: 'Modified', accessor: 'modified', width: 20 },
  ]
  const t = new Table(columns, nodes)
  const s = t.toString()
  console.log(s)
  console.log('done')
}

module.exports = { list }
