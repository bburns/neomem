// const Table = require('easy-table')
const fetchQuery = require('./fetchQuery')
const Table = require('./table')

async function list() {
  const query = `query { node { name, type, url, date_added, depth }}`
  const json = await fetchQuery(query)
  const nodes = json.data.node
  // const t = new Table()
  // nodes.forEach(node => {
  //   t.cell('Name', node.name)
  //   t.cell('Type', node.type)
  //   t.cell('Url', node.url)
  //   t.cell('Date Added', node.date_added)
  //   t.newRow()
  // })
  // const s = t.toString()
  const columns = [
    { name: 'Name', accessor: 'name', width: 36 },
    { name: 'Type', accessor: 'type', width: 8 },
    { name: 'Url', accessor: 'url', width: 20 },
    { name: 'Date Added', accessor: 'date_added', width: 30 },
  ]
  const t = new Table(columns, nodes)
  const s = t.toString()
  console.log(s)
}

// async function compare() {
//   const query = `query { node { name, type, guid, url, date_added, date_modified }}`
//   const json = await fetchQuery(query)
//   const nodes = json.data.node
//   const t = new Table()
//   nodes.forEach(node => {
//     t.cell('Name', node.name)
//     t.cell('Type', node.type)
//     t.cell('Url', node.url)
//     t.cell('Date Added', node.date_added)
//     t.cell('Date Modified', node.date_modified)
//     t.cell('Guid', node.guid)
//     t.newRow()
//   })
//   const s = t.printTransposed()
//   console.log(s)
// }

module.exports = { list }
