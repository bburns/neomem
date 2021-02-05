// commands
// define console ui commands - look, list, etc

//. query fields and coldefs will come from the datasource metainfo

const api = require('./api')
const { getPath } = require('neomem-util')
// const Table = require('./table') // wrapper around gajus table library

//. move to neomem-util?
async function exists(path) {
  // ask the datasource if the given path exists
  // const json = await api.get(query)
  return true //. for now
}

async function getMeta(path) {
  const query = {
    path,
    fields: [''],
  }
  const json = await api.get(query)
  return json
}

async function go(tokens, context) {
  const dest = tokens[1]
  if (!dest) {
    console.log('No location given.')
    return
  }
  const path = getPath(dest, context.global.location)
  if (await exists(path)) {
    context.global.location = path
    console.log('Moved to', path + '.')
  } else {
    console.log('Invalid location.')
  }
  await look(tokens, context)
}

async function list(tokens, context) {
  const path = getPath(tokens[1], context.global.location)
  const meta = await getMeta(path)
  const query = {
    path,
    fields: ['name', 'type', 'url', 'notes', 'created', 'modified'], //. get from meta
    sortby: ['name'],
    limit: 5,
  }
  const json = await api.get(query)
  console.log(json)
  //. recurse and build depth values for treelist
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
  await location(tokens, context) // print location
  console.log(json)
  console.log('print number of items, types, etc')
}

const l = look

module.exports = { go, list, location, loc, look, l }
