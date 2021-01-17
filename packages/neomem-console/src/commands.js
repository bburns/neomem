// const Table = require('easy-table')
const { table, getBorderCharacters } = require('table')
const fetchQuery = require('./fetchQuery')

async function list() {
  const query = `query { node { name, type, guid, url, date_added, date_modified, depth }}`
  const json = await fetchQuery(query)
  const nodes = json.data.node
  // const t = new Table()
  // nodes.forEach(node => {
  //   t.cell('Name', node.name)
  //   t.cell('depth', node.depth)
  //   t.cell('Type', node.type)
  //   t.cell('Url', node.url)
  //   t.cell('Date Added', node.date_added)
  //   t.cell('Date Modified', node.date_modified)
  //   t.newRow()
  // })
  // const s = t.toString()
  const arr = Object.values(nodes).map(node => [
    '--'.repeat(node.depth) + node.name,
    node.type,
    node.url,
    node.date_added,
    // node.date_modified,
    // node.depth,
  ])
  const headings = `Name,Type,Url,Date Added`.split(',')
  const arr2 = [headings, ...arr]
  const wrapWord = true
  const options = {
    columnDefault: {
      width: 20,
      truncate: 20,
    },
    columns: {
      0: { width: 30, truncate: 30, wrapWord },
      1: { width: 8, truncate: 8, wrapWord },
      2: { width: 30, truncate: 30, wrapWord },
      // 5: { width: 8, truncate: 8, wrapWord },
    },
    // singleLine: true,
    border: getBorderCharacters(`ramac`),
    drawHorizontalLine: (index, size) =>
      index === 0 || index === 1 || index === size,
  }
  const s = table(arr2, options)
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
