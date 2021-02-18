// define console ui commands - look, list, etc

const { Path, Query } = require('neomem-util')
const { Data } = require('./data')
const { Metadata } = require('./metadata')
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

  // get absolute path object
  const path = Path.make(context.location, target)

  // move to target if it exists
  if (await Data.exists({ path })) {
    context.location = path.str
    ui.print('Moved to', path.str + '.')
  } else {
    ui.print('Invalid location.')
  }

  // if verbose
  //. await look({ tokens: [], context, ui }) // don't pass tokens here
}

go.undo = async options => {
  const { ui, context } = options
  context.location = options.preservedLocation
}

/**
 * history
 */
async function history(options) {
  const { Processor, ui } = options
  const history = Processor.getHistory()
  ui.print(history)
}

const h = history

/**
 * list [target]
 */
async function list(options) {
  const { tokens, context, ui } = options

  // parse input (will be more extensive)
  const target = tokens[1] || '' // eg 'books'

  // get data
  const pathobj = Path.make(context.location, target) // eg { str: '/bookmarks/books/scifi', ... }
  const query = Query.make({ base: context.base, pathobj })
  const view = await Data.get(query.meta('views/console/list'))
  console.log(66, view)
  console.log(67, query)
  const items = await Data.get(query.view(view))

  //. recurse and build depth values for treelist
  //. handle tree indentation with item.depth
  // accessor: item => ' '.repeat(item.depth) + item.name,
  // const tableColumns = metadata.view.columns.map(column => ({
  const columns = view.columns || 'name,type,description'.split(',')
  const tableColumns = columns.map(column => ({
    name: column.key,
    accessor: column.key,
    width: column.width || 10,
  }))
  const t = new Table(tableColumns, items)
  const s = t.toString()
  ui.print(s)
}

/**
 * location
 */
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

  // parse input
  const target = tokens[1] || '' // eg 'books/scifi' or ''

  // get data
  const pathobj = Path.make(context.location, target) // eg { str: '/bookmarks/books/scifi', ... }
  const query = Query.make({ base: context.base, path: pathobj.str })
  const view = await Data.get(query.meta('views/console/look'))
  const item = await Data.get(query.view(view).set('depth', 0))

  // print location and table with item properties
  await location(options)
  //. this is more metadata, eh? where store?
  const tableColumns = [
    { name: 'name', accessor: 'name', width: 12 },
    { name: 'value', accessor: 'value', width: 50 },
  ]
  const fields = view.fields || 'name,type,description'.split(',')
  const rows = fields.map(field => ({ name: field, value: item[field] }))
  const t = new Table(tableColumns, rows)
  const s = t.toString()
  ui.print(s)
  ui.print('and print number of items, types, etc')
}

const l = look

//. will require processor to leave items in history tree, move a pointer on undo
/**
 * redo
 */
async function redo(options) {
  const { Processor } = options
  await Processor.redo(options)
}

/**
 * undo
 */
async function undo(options) {
  const { Processor } = options
  await Processor.undo(options)
}

/**
 * unknown
 */
async function unknown(options) {
  const { tokens, context, ui } = options
  ui.print(`Unknown command: ${tokens[0]}.`)
}

const Action = {
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

module.exports = { Action }
