// define console ui commands - look, list, etc

const { Path, Query } = require('neomem-util')
const { Data } = require('./data')
const { Metadata } = require('./metadata')
const { Table } = require('./table') // wrapper around a table library

/**
 * @typedef Options {Object}
 * @property {string[]} tokens
 * @property {Object} context
 * @property {Object} ui
 * @property {Object} Processor
 */

/**
 * go [target]
 * @param options {Options}
 */
async function go(options) {
  const { tokens, context, ui } = options

  // parse input
  const target = tokens[1] // eg "bookmarks"

  if (!target) {
    ui.print('No location given.')
    return
  }

  // get absolute path
  const path = Path.join(context.location, target)

  // move to target if it exists
  if (await Data.exists({ path })) {
    context.location = path
    ui.print('Moved to', path + '.')
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
 * @param options {Options}
 */
async function history(options) {
  const { Processor, ui } = options
  const history = Processor.getHistory()
  ui.print(history)
}

const h = history

/**
 * list [target]
 * @param options {Options}
 */
async function list(options) {
  const { tokens, context, ui } = options

  // parse input (will be more extensive)
  const target = tokens[1] || '' // eg 'books'

  // get data
  const path = Path.join(context.location, target)
  const query = Query.make(context.base, { path })
  const metadata = await Data.get(query.getMetaQuery('views/console/list'))
  const items = await Data.get(query.getViewQuery(metadata))

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

/**
 * location
 * @param options {Options}
 */
async function location(options) {
  const { ui, context } = options
  ui.print(context.location)
}

const loc = location

/**
 * look [target]
 * @param options {Options}
 */
async function look(options) {
  const { tokens, context, ui } = options

  // parse input
  const target = tokens[1] || '' // eg 'books/scifi' or ''

  // get data
  const path = Path.join(context.location, target)
  const query = Query.make(context.base, { path })
  const metadata = await Data.get(query.getMetaQuery('views/console/look'))
  const q2 = query.getViewQuery(metadata).set('depth', 0)
  console.log(118, q2, q2.str)
  const item = await Data.get(q2) // calls Http.get(q2.url)

  // print location and table with item properties
  await location(options)
  //. this is more metadata, eh? where store?
  const tableColumns = [
    { name: 'name', accessor: 'name', width: 12 },
    { name: 'value', accessor: 'value', width: 50 },
  ]
  const fields = metadata.view.columns.map(column => column.key)
  const rows = fields.map(field => ({ name: field, value: item[field] }))
  const t = new Table(tableColumns, rows)
  const s = t.toString()
  ui.print(s)
  ui.print('and print number of items, types, etc')
}

const l = look

/**
 * redo
 * @param options {Options}
 */
//. will require processor to leave items in history tree, move a pointer on undo
async function redo(options) {
  const { Processor } = options
  await Processor.redo(options)
}

/**
 * undo
 * @param options {Options}
 */
async function undo(options) {
  const { Processor } = options
  await Processor.undo(options)
}

/**
 * unknown
 * @param options {Options}
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
