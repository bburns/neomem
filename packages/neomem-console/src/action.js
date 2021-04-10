// define console ui commands - look, list, etc

const { Path, Query, Metadata } = require('neomem-util')
const { Data } = require('./data')
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
 * @param {Options} options
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
go.description = `Go to a new location.`
go.undo = async options => {
  const { context } = options
  context.location = options.preservedLocation
}

/**
 * help
 * @param {Options} options
 */
async function help(options) {
  // console.log(Action)
  for (const key of Object.keys(Action)) {
    const action = Action[key]
    console.log({ key, description: action.description })
  }
}
help.description = `Show list of available commands.`

/**
 * history
 * @param {Options} options
 */
async function history(options) {
  const { Processor, ui } = options
  const cmds = Processor.getHistory()
  const strs = cmds.map(cmd => cmd.str)
  ui.print(strs)
}
history.description = `Show command history.`

const h = history

/**
 * list [target]
 * @param {Options} options
 */
async function list(options) {
  const { tokens, context, ui } = options

  // parse input (will be more extensive)
  const target = tokens[1] || '' // eg 'books'

  // get data
  const path = Path.join(context.location, target) // eg '/bookmarks/books/scifi'
  const query = Query.make(context.base, { path })
  const metadata = await Data.get(query.with({ meta: 1 }))
  const fields = Metadata.getFields(metadata) // eg 'name,url'
  const items = await Data.get(query.with({ fields }))

  //. recurse and build depth values for treelist
  //. handle tree indentation with item.depth
  // accessor: item => ' '.repeat(item.depth) + item.name,
  const columns = Metadata.getColumns(metadata)
  const tableColumns = columns.map(column => ({
    name: column.key,
    accessor: column.key,
    width: column.width || 10,
  }))
  const table = new Table(tableColumns, items)
  const s = table.toString()
  ui.print(s)
}
list.description = `List contents of current location in a table.`

/**
 * location
 * @param {Options} options
 */
async function location(options) {
  const { ui, context } = options
  ui.print(context.location)
}
location.description = `Show current location/path.`

const loc = location

/**
 * look [target]
 * @param {Options} options
 */
async function look(options) {
  const { tokens, context, ui } = options

  // parse input
  const target = tokens[1] || '' // eg 'books/scifi' or ''

  // get data
  const path = Path.join(context.location, target) // eg '/bookmarks/books/scifi'
  const query = Query.make(context.base, { path })
  const metadata = await Data.get(query.with({ meta: 1 }))
  const fields = Metadata.getFields(metadata) // eg 'name,url'
  const item = await Data.get(query.with({ fields, depth: 0 }))

  // print location
  await location(options)

  // print table with item properties
  //. where store/get this?
  const tableColumns = [
    { name: 'name', accessor: 'name', width: 12 },
    { name: 'value', accessor: 'value', width: 50 },
  ]
  const keys = Metadata.getKeys(metadata)
  const rows = keys.map(key => ({ name: key, value: item[key] }))
  const table = new Table(tableColumns, rows)
  const s = table.toString()
  ui.print(s)
  ui.print('and print number of items, types, etc')
}
look.description = `Look at and describe current location.`

const l = look

/**
 * redo
 * @param {Options} options
 */
//. will require processor to leave items in history tree, move a pointer on undo
async function redo(options) {
  const { Processor } = options
  await Processor.redo(options)
}
redo.description = `Redo the last undone command.`

/**
 * undo
 * @param {Options} options
 */
async function undo(options) {
  const { Processor } = options
  await Processor.undo(options)
}
undo.description = `Undo the previous command.`

/**
 * unknown
 * @param {Options} options
 */
async function unknown(options) {
  const { tokens, context, ui } = options
  ui.print(`Unknown command: ${tokens[0]}.`)
}

const Action = {
  go,
  help,
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
