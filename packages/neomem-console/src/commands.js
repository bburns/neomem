// commands
// define console ui commands - look, list, etc

//. query fields and coldefs will come from the datasource metainfo

const pathLib = require('path') // node lib https://nodejs.org/api/path.html
const api = require('./api')
// const Table = require('./table') // wrapper around gajus table library
const { getPath } = require('neomem-util')

async function exists(path) {
  // ask the datasource if the given path exists
  // const json = await api.get(query)
  return true //. for now
}

async function go(tokens, context) {
  const dest = tokens[1]
  //. validate path
  const path = dest.startsWith('/')
    ? dest
    : pathLib.join(context.global.location, dest)
  if (await exists(path)) {
    context.global.location = path
    console.log('Moved to', path + '.')
  } else {
    console.log('Invalid location.')
  }
}

async function list(tokens, context) {
  // const dest = tokens[1] || ''
  // const path = dest.startsWith('/')
  //   ? dest
  //   : dest
  //   ? pathLib.join(context.global.location, dest)
  //     : context.global.location
  const path = getPath(tokens[1], context.global.location)
  const query = {
    path,
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

async function location(tokens, context) {
  console.log(context.location)
}

const loc = location

async function look(tokens, context) {
  const path = getPath(tokens[1], context.global.location)
  const query = {
    path,
    fields: ['name', 'type', 'description', 'created', 'modified'],
    depth: 0,
  }
  const json = await api.get(query)
  location(tokens, context) // print location
  console.log(json)
  console.log('print number of items, types, etc')
}

const l = look

module.exports = { go, list, location, loc, look, l }
