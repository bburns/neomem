// define console ui commands - look, list, etc

const api = require('./api')
const { Path, Query } = require('neomem-util')
const { getMetadata, getFields } = require('./meta')
const { Table } = require('./table') // wrapper around a table library

async function go(options) {
  const { tokens, context, ui } = options
  const destination = tokens[1]
  if (!destination) {
    ui.print('No location given.')
    return
  }
  const path = Path.make(context.location, destination)
  if (await api.exists(path.string)) {
    context.location = path.string
    ui.print('Moved to', path.string + '.')
  } else {
    ui.print('Invalid location.')
  }
  //. await look([], context) // don't pass tokens here
}
go.undo = async options => {
  const { ui, context } = options
  context.location = options.preservedLocation
}

async function history(options) {
  const { processor, ui } = options
  const history = processor.history()
  ui.print(history)
}

const h = history

async function list(options) {
  const { tokens, context, ui } = options
  const destination = tokens[1] || '' // eg 'books'
  const path = Path.make(context.location, destination) // eg => '/bookmarks/books'
  // const metadata = await getMetadata(path)
  // const fields = getFields(metadata)
  const fields = 'name,type,url'.split(',')
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
  console.log(items)
  // //. recurse and build depth values for treelist
  // //. handle tree indentation with item.depth
  // // accessor: item => ' '.repeat(item.depth) + item.name,
  // const tableColumns = metadata.view.columns.map(column => ({
  //   name: column.key,
  //   accessor: column.key,
  //   width: column.width || 10,
  // }))
  // const t = new Table(tableColumns, items)
  // const s = t.toString()
  // ui.print(s)
}

async function location(options) {
  const { ui, context } = options
  ui.print(context.location)
}

const loc = location

async function look(options) {
  const { tokens, context, ui } = options
  const destination = tokens[1] || '' // eg 'books/scifi'
  const path = Path.make(context.location, destination)
  // console.debug(path)

  //. const metadataQuery = Query.make()
  //. const metadata = await api.get(metadataQuery)
  const metadata = await getMetadata(path) //. const view = meta.get('view') ?
  console.debug('metadata', metadata)
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
  await location(options)
  const tableColumns = [
    { name: 'name', accessor: 'name', width: 12 },
    { name: 'value', accessor: 'value', width: 50 },
  ]
  const rows = fields.map(field => ({ name: field, value: item[field] }))
  const t = new Table(tableColumns, rows)
  const s = t.toString()
  ui.print(s)
  ui.print('and print number of items, types, etc')
}

const l = look

//. will require processor to leave items in history tree, move a pointer on undo
async function redo(options) {
  const { processor } = options
  await processor.redo(options)
}

async function undo(options) {
  const { processor } = options
  await processor.undo(options)
}

async function unknown(options) {
  const { tokens, context, ui } = options
  ui.print(`Unknown command: ${tokens[0]}.`)
}

module.exports = {
  go,
  history,
  h,
  list,
  location,
  loc,
  look,
  l,
  redo,
  undo,
  unknown,
}
