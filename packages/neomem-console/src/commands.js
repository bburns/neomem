// define console ui commands - look, list, etc

const { Data } = require('./data')
const { Metadata } = require('./metadata')
const { Path, Query } = require('neomem-util')
const { getMetadata, getFields } = require('./meta')
const { Table } = require('./table') // wrapper around a table library

/**
 * go [target]
 */
async function go(options) {
  const { tokens, context, ui } = options

  // parse input
  const target = tokens[1] // eg "bookmarks"

  if (!target) {
    ui.print('No location given.')
    return
  }

  const path = Path.make(context.location, target)

  if (await Data.exists(path.str)) {
    context.location = path.str
    ui.print('Moved to', path.str + '.')
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

  // parse input
  const target = tokens[1] || '' // eg 'books'

  // get absolute path
  const path = Path.make(context.location, target) // eg => '/bookmarks/books'

  // get metadata
  const metadata = await Metadata.get({ path })

  // get data
  const data = await Data.get({ path, metadata })

  // // const metadata = await getMetadata(path)
  // // const fields = getFields(metadata)
  // const fields = 'name,type,url'.split(',')
  // // build a query object and fetch results
  // const query = {
  //   path,
  //   params: {
  //     fields, // eg ['name', 'type', 'url']
  //     sortby: 'name',
  //     limit: 5,
  //   },
  // }
  // const items = await api.get(query)
  // console.log(items)

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

/**
 * look [target]
 */
async function look(options) {
  const { tokens, context, ui } = options

  // parse sentence
  const target = tokens[1] || '' // eg 'books/scifi' or ''

  // get absolute path
  const path = Path.make(context.location, target) // eg { str: '/bookmarks/books/scifi', ... }

  // get metadata about item
  const metadata = await Meta.get({ path })

  // get data
  const data = await Data.get({ path, metadata })

  // print location and table with item properties
  await location(options)
  //. this is more metadata, eh? where store?
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
