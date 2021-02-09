// commands
// define console ui commands - look, list, etc

const api = require('./api')
const { Path } = require('neomem-util')
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

async function location(tokens, context, ui) {
  ui.print(context.location)
}

const loc = location

async function look(tokens, context, ui) {
  const path = Path.make(context.location, tokens[1])
  const metadata = await getMetadata(path) //. const view = meta.get('view') ?
  const fields = getFields(metadata) //. const fields = view.fields ?
  const query = {
    path,
    params: {
      fields, // eg ['name', 'type', 'description']
      depth: 0, // look at the item not its contents
    },
  }
  const item = await api.get(query) // get the ONE item
  await location(tokens, context, ui) // print location
  const items = fields.map(field => ({ name: field, value: item[field] }))
  const tableColumns = [
    { name: 'Name', accessor: 'name', width: 12 },
    { name: 'Value', accessor: 'value', width: 50 },
  ]
  const t = new Table(tableColumns, items)
  const s = t.toString()
  ui.print(s)
  ui.print('and print number of items, types, etc')
}

const l = look

module.exports = { go, list, location, loc, look, l }
