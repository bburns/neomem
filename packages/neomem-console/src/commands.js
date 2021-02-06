// commands
// define console ui commands - look, list, etc

//. query fields and coldefs will come from the datasource metainfo

const pathLib = require('path') // node lib
const api = require('./api')
const { getPath } = require('neomem-util')
// const Table = require('./table') // wrapper around gajus table library

//. move to neomem-util?
async function exists(path) {
  // ask the datasource if the given path exists
  // const json = await api.get(query)
  return true //. for now
}

// get meta information for a path, including views
async function getMeta(path) {
  const query = {
    path: pathLib.join(path, '.neomem'),
    // fields: [''],
  }
  //. recurse upwards until find a .neomem item?
  const meta = await api.get(query)
  // const meta = {
  //   view: {
  //     columns: [
  //       { key: 'name', width: 20 },
  //       { key: 'type', width: 12 },
  //       { key: 'url', width: 30 },
  //       { key: 'created', width: 12 },
  //       { key: 'modified', width: 12 },
  //     ],
  //   },
  // }
  return meta
}

function getFields(meta) {
  console.log(meta)
  const fields = meta.view.columns.map(col => col.key)
  return fields
}

async function go(tokens, context) {
  const dest = tokens[1]
  if (!dest) {
    console.log('No location given.')
    return
  }
  const path = getPath(dest, context.location)
  if (await exists(path)) {
    context.location = path
    console.log('Moved to', path + '.')
  } else {
    console.log('Invalid location.')
  }
  await look([], context) // don't pass tokens here
}

async function list(tokens, context) {
  const path = getPath(tokens[1], context.global.location)
  const meta = await getMeta(path)
  console.log(meta)
  const fields = getFields(meta)
  const query = {
    path,
    fields, // eg ['name', 'type', 'url']
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
}

async function location(tokens, context) {
  console.log(context.location)
}

const loc = location

async function look(tokens, context) {
  const path = getPath(tokens[1], context.location)
  const meta = await getMeta(path)
  const fields = getFields(meta)
  const query = {
    path,
    fields, // eg ['name', 'type', 'description']
    depth: 0,
  }
  const json = await api.get(query)
  await location(tokens, context) // print location
  console.log(json)
  console.log('print number of items, types, etc')
}

const l = look

module.exports = { go, list, location, loc, look, l }
