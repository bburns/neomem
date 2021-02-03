// define commands

//. query fields and coldefs will come from the datasource metainfo

const path = require('path') // node lib https://nodejs.org/api/path.html
const api = require('./api')
// const Table = require('./table') // wrapper around gajus table library

async function go(tokens, context) {
  const dest = tokens[1]
  context.global.location = dest.startsWith('/')
    ? dest
    : path.join(context.global.location, dest)
  console.log('Moved to', context.global.location + '.')
}

async function list(tokens, context) {
  const dest = tokens[1] || ''
  const queryPath = dest.startsWith('/')
    ? dest
    : dest
    ? path.join(context.global.location, dest)
    : context.global.location
  const query = {
    path: queryPath,
    fields: ['name', 'type', 'url', 'notes', 'created', 'modified'],
    sortby: ['name'],
    limit: 5,
  }
  // console.log('query:', query)
  const json = await api.get(query)
  console.log(json)
  // const data = json.data.bookmarks.data //.
  // console.log('data', data)
  // const nodes = data.node
  // const columns = [
  //   {
  //     name: 'Name',
  //     accessor: obj => ' '.repeat(obj.depth) + obj.name,
  //     width: 36,
  //   },
  //   { name: 'Type', accessor: 'type', width: 10 },
  //   { name: 'Notes', accessor: 'notes', width: 20 },
  //   { name: 'Created', accessor: 'created', width: 18 },
  //   { name: 'Modified', accessor: 'modified', width: 18 },
  // ]
  // const t = new Table(columns, nodes)
  // const s = t.toString()
  // console.log(s)
  // console.log('done')
}

module.exports = { go, list }
