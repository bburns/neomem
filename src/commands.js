import { exec } from 'child_process' // node lib
import chalk from 'chalk' // color text https://github.com/chalk/chalk
import { drivers } from './drivers/index.js'
import { views } from './views/index.js'

const print = console.log

//------------------------------------------------------------------------
// back
//------------------------------------------------------------------------

async function back(connection, key, words, past) {
  if (past.length > 1) {
    past.pop()
    const previous = past[past.length - 1]
    await look(previous.connection, previous.key)
    return previous
  }
  print(`No more history.`)
}
back.notes = `go back to previous location`

//------------------------------------------------------------------------
// edit
//------------------------------------------------------------------------

async function edit(connection, key, words) {
  //.
  console.log(key)
  console.log(connection)
  const { path } = connection
  exec(`code ${path}`, (error, stdout, stderr) => {
    print('done')
  })
}
edit.notes = `edit notes for a node`

//------------------------------------------------------------------------
// go
//------------------------------------------------------------------------
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n)
}

async function go(connection, key, words, past, table) {
  //. dest can be adjacent edge name, node name, abs path, id, rownum
  // eg 'north', 'home', '/home', 'hello.txt', '2'
  const dest = words[1]
  key = dest

  if (isNumber(key)) {
    key = table[key][1]
  }

  // get node of new location
  const node = await connection.get(key)
  const type = await node.get('type')

  if (type === 'mount') {
    const driverName = (await node.get('driver')) || 'markdown' //.
    const driver = drivers[driverName]
    connection = await driver.connect(key)
    key = await connection.getInitialLocation()
  }

  await look(connection, key, words)

  past.push({ connection, key })

  return { connection, key }
}
go.notes = `go to another location, or in a direction`

//------------------------------------------------------------------------
// help
//------------------------------------------------------------------------

async function help(connection, key, words) {
  const rows = Object.keys(commands).map(key => [key, commands[key].notes])
  print(rows)
}
help.notes = `get help`

//------------------------------------------------------------------------
// info
//------------------------------------------------------------------------

async function info(connection, key, words, past) {
  print({ connection, key, words, past })
}
info.notes = `get debugging info`

//------------------------------------------------------------------------
// look
//------------------------------------------------------------------------

async function look(connection, key, words) {
  const node = await connection.get(key)
  console.log({ node })
  const name = await node.get('name')
  const type = await node.get('type')
  const notes = ((await node.get('notes')) || '').slice(0, 60)
  const source = await node.get('source')
  const contents = await node.get('contents')
  const exits = await node.get('exits')

  //. use metadata to determine what props to include
  // print(chalk.bold('[' + name + ']'))
  // print(chalk.bold(name))
  printRow('name', name)
  if (type) printRow('type', type)
  if (notes) printRow('notes', notes)
  if (source) printRow('source', source)
  if (contents && contents.length > 0) printRow('contents', contents.join(', '))
  if (exits && exits.length > 0) printRow('exits', exits.join(', '))
  function printRow(name, value) {
    print(name + ':', value)
  }
}
look.notes = `look at this or another location`

//------------------------------------------------------------------------
// list
//------------------------------------------------------------------------

async function list(connection, key, words) {
  const node = await connection.get(key)
  const name = await node.get('name')
  print(chalk.bold(name))
  //. use metadata to determine what cols to include, sort, group, etc
  const meta = {
    columns: 'n,name,size,created,modified'.split(','),
  }
  //. attach data to view, execute it
  const table = await views.treetable(node, 'contents', meta, connection)
  console.log(table)
  return { table }
}
list.notes = `list contents of this or another location`

//------------------------------------------------------------------------
// unknown
//------------------------------------------------------------------------

async function unknown(connection, key, words) {
  print('Huh?')
}

//------------------------------------------------------------------------

export const commands = { back, edit, go, help, info, look, list, unknown }
export const aliases = { l: look }
