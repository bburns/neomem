// commands
// define console ui commands - look, list, etc

const api = require('./api')
const { Path, Query } = require('neomem-util')
const { getMetadata, getFields } = require('./meta')
const { Table } = require('./table') // wrapper around a table library

async function go(tokens, context, ui) {
  const dest = tokens[1]
  if (!dest) {
    ui.print('No location given.')
    return
  }
  const path = getPath(dest, context.location)
  if (await exists(path)) {
    context.location = path
    ui.print('Moved to', path + '.')
  } else {
    ui.print('Invalid location.')
  }
  await look([], context) // don't pass tokens here
}

async function list(tokens, context, ui) {
  const path = getPath(tokens[1], context.location) // eg '/bookmarks'
  const metadata = await getMetadata(path)
  const fields = getFields(metadata)
  // build a query object and fetch results
  const query = {
    path,
    params: {
      fields, // eg ['name', 'type', 'url']
      sortby: 'name',
      limit: 5,
    },
  }
  const items = await api.get(query)
  //. recurse and build depth values for treelist
  //. handle tree indentation with item.depth
  // accessor: item => ' '.repeat(item.depth) + item.name,
  const tableColumns = metadata.view.columns.map(column => ({
    name: column.key,
    accessor: column.key,
    width: column.width || 10,
  }))
  const t = new Table(tableColumns, items)
  const s = t.toString()
  ui.print(s)
}

// async function location(tokens, context, ui) {
// async function location(options) {
async function location(options) {
  const { ui, context } = options
  ui.print(context.location)
}

const loc = location

// async function look(tokens, context, ui) {
async function look(options) {
  const { tokens, context, ui } = options
  const { location } = context // eg '/bookmarks'
  const destination = tokens[1] || '' // eg 'books/scifi'
  const path = Path.make(location, destination)

  //. const metadataQuery = Query.make()
  //. const metadata = await api.get(metadataQuery)
  // const metadata = await getMetadata(path) //. const view = meta.get('view') ?
  // const fieldnames = getFieldNames(metadata) //. const fields = view.fields ?
  const fields = 'name,type,description,url'.split(',')

  const query = {
    path,
    params: {
      fields, // eg ['name', 'type', 'description']
      depth: 0, // look at the item not its contents
    },
    paramsString: '',
  }
  // const query = Query.make()
  const item = await api.get(query) // get the ONE item

  // print location and table with item properties
  // await location(tokens, context, ui)
  await location(options)
  const rows = fields.map(field => ({ name: field, value: item[field] }))
  const tableColumns = [
    { name: 'name', accessor: 'name', width: 12 },
    { name: 'value', accessor: 'value', width: 50 },
  ]
  const t = new Table(tableColumns, rows)
  const s = t.toString()
  ui.print(s)
  ui.print('and print number of items, types, etc')
}

const l = look

// async function undo(tokens, context, ui, history, processor) {
async function undo(options) {
  const command = options.history.pop()
  if (command) {
    options.processor.undo(command)
  } else {
    options.ui.print(`No more history to undo.`)
  }
}

async function unknown(tokens, context, ui) {
  ui.print(`Unknown command: ${tokens[0]}.`)
  throw new Error('kjnkjnkjnk')
}

module.exports = { go, list, location, loc, look, l, undo, unknown }
