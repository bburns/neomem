// command handler functions, eg look, list

import { exec } from 'child_process' // node lib
import chalk from 'chalk' // color text https://github.com/chalk/chalk
import { drivers } from './drivers/index.js'
import { views } from './views/index.js'
import * as lib from './lib.js'

//. fns will receive this as part of ui object
const print = console.log

//------------------------------------------------------------------------
// back
//------------------------------------------------------------------------

async function back({ connection, location, words, past }) {
  if (past.length > 1) {
    past.pop()
    const previous = past[past.length - 1]
    await look({ connection: previous.connection, location: previous.location })
    return previous
  }
  print(`No more history.`)
}
back.notes = `Go back to previous location`

//------------------------------------------------------------------------
// edit
//------------------------------------------------------------------------

async function edit({ connection, location, words }) {
  //. handle path = connection.path or location + words
  const { path } = connection
  exec(`code ${path}`, (error, stdout, stderr) => {
    print('done')
  })
}
edit.notes = `Edit notes for a node`

//------------------------------------------------------------------------
// go
//------------------------------------------------------------------------

async function go({ connection, location, words, past, table }) {
  //. destination can be an adjacent edge name, node name, abs path, id, rownum,
  // adjective+noun, or something in the location history / context, etc
  // eg 'north', 'home', '/home', 'hello.txt', '2', 'books'
  //. will need same destination handler for other cmds - list, look, edit, etc.
  const destination = words[1]
  location = destination

  //. get location from rownum in previous table
  if (lib.isNumber(location)) {
    location = table[location][1] //..
  }

  // get node of new location
  const node = await connection.get(location)
  const type = await node.get('type')

  if (type === 'mount') {
    const driverName = (await node.get('driver')) || 'markdown' //.
    const driver = drivers[driverName]
    connection = await driver.connect(location)
    location = await connection.getInitialLocation()
  }

  await look({ connection, location, words })

  past.push({ connection, location })

  return { connection, location }
}
go.notes = `Go to another location, or in a direction`

//------------------------------------------------------------------------
// help
//------------------------------------------------------------------------

async function help({ connection, location, words }) {
  //. could ask for help on a topic
  //. add aliases
  const rows = Object.keys(commands)
    .filter(key => commands[key].notes)
    .sort((a, b) => a.localeCompare(b))
    .map(key => [key, commands[key].notes])

  //. print with treetable view
  print(rows)
}
help.notes = `Get help`

//------------------------------------------------------------------------
// info
//------------------------------------------------------------------------

async function info({ connection, location, words, past }) {
  print({ connection, location, words, past })
}
info.notes = `Get debugging info`

//------------------------------------------------------------------------
// look
//------------------------------------------------------------------------

async function look({ connection, location, words = [] }) {
  const node = await connection.get(location)
  const name = await node.get('name')
  const path = await node.get('path')
  const type = await node.get('type')
  const notes = ((await node.get('notes')) || '').slice(0, 60) //.
  const source = await node.get('source')
  const contents = await node.get('contents')
  const exits = await node.get('exits')

  //. use metadata to determine what props to include
  printRow('name', name)
  printRow('path', path)
  if (type) printRow('type', type)
  if (notes) printRow('notes', notes)
  if (source) printRow('source', source)
  if (contents && contents.length > 0) printRow('contents', contents.join(', '))
  if (exits && exits.length > 0) printRow('exits', exits.join(', '))
  function printRow(name, value) {
    print(name + ':', value)
  }
}
look.notes = `Look at this or another location`

//------------------------------------------------------------------------
// list
//------------------------------------------------------------------------

async function list({ connection, location, words }) {
  //. handle destination - direction, name, path, etc
  const destination = words[1]
  const node = await connection.get(location)
  const name = await node.get('name')
  //. use metadata to determine what cols to include, sort, group, etc.
  //. this will have default cols, and store modifications with item, or type, or location etc.
  const meta = {
    columns: 'n,name,size,created,modified'.split(','),
  }
  //. attach data to view, execute it
  //. maybe treetable returns a new View object, like driver.connect()?
  const table = await views.treetable(node, 'contents', meta, connection)
  print(chalk.bold(name))
  print(table)
  return { table }
}
list.notes = `List contents of this or another location`

//------------------------------------------------------------------------
// unknown
//------------------------------------------------------------------------

async function unknown() {
  print('Huh?')
}

//------------------------------------------------------------------------

export const commands = { back, edit, go, help, info, look, list, unknown }
export const aliases = { l: look }
