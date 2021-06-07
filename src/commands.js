import { exec } from 'child_process' // node lib
import chalk from 'chalk' // color text https://github.com/chalk/chalk
import { drivers } from './drivers/index.js'

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
  exec('code pok.txt', (error, stdout, stderr) => {
    print('done')
  })
}
edit.notes = `edit notes for a node`

//------------------------------------------------------------------------
// go
//------------------------------------------------------------------------

async function go(connection, key, words, past) {
  //. dest can be adjacent edge name, node name, or abs path, or id
  // eg 'go north', 'go /home', 'go hello.txt', 'go 2', 'go up'
  const dest = words[1]
  key = dest

  // get node of new location
  const node = await connection.get(key)
  const type = await node.get('type')
  const typeName = await type.get('name')

  if (typeName === 'mount') {
    const driverName = (await node.get('driver')) || 'markdown' //.
    const driver = drivers[driverName]
    connection = await driver.connect()
    const source = await node.get('source')
    // await connection.load('./src/' + source)
    await connection.load(source)
    key = connection.getInitialLocation()
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
  const name = await node.get('name')
  const type = await node.get('type')
  const typeName = await type.get('name')
  const notes = (await node.get('notes')).slice(0, 60)
  const source = await node.get('source')
  const contents = await node.get('contents')
  const exits = await node.get('exits')

  //. use metadata to determine what props to include
  print(chalk.bold(name))
  function printRow(name, value) {
    // print(chalk.gray(name + ':'), value)
    print(name + ':', value)
  }
  if (typeName) printRow('type', typeName)
  if (notes) printRow('notes', notes)
  if (source) printRow('source', source)
  if (contents && contents.length > 0) printRow('contents', contents.join(', '))
  if (exits && exits.length > 0) printRow('exits', exits.join(', '))
}
look.notes = `look at this or another location`

//------------------------------------------------------------------------
// list
//------------------------------------------------------------------------

async function list(connection, key, words) {
  console.log(connection.path, { key })
  const node = await connection.get(key)
  const name = await node.get('name')
  const contents = await node.get('contents')
  //. use metadata to determine what cols to include, sort, group, etc
  print(chalk.bold(name))
  if (contents && contents.length > 0) print(contents.join('\n'))
}
list.notes = `list contents of this or another location`

//------------------------------------------------------------------------
// unknown
//------------------------------------------------------------------------

async function unknown(connection, key, words) {
  print('Huh?')
}

//------------------------------------------------------------------------

export const aliases = { l: look }
export const commands = { back, edit, go, help, info, look, list, unknown }
