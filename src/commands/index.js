// command handler functions

import { exec } from 'child_process' // node lib
import chalk from 'chalk' // color text https://github.com/chalk/chalk
import { drivers } from '../drivers/index.js'
import { views } from '../views/index.js'
import * as lib from '../lib.js'
import * as libcommands from './libcommands.js'

//. fns will receive this as part of ui object
const print = console.log

//------------------------------------------------------------------------
// back
//------------------------------------------------------------------------

async function back({ past }) {
  if (past.length > 1) {
    past.pop()
    const previous = past[past.length - 1]
    await look({ datasource: previous.datasource, location: previous.location })
    return previous
  }
  print(`No more history.`)
}
back.notes = `Go back to previous location`

//------------------------------------------------------------------------
// edit
//------------------------------------------------------------------------

async function edit({ datasource, location, words, past, table }) {
  const destination = libcommands.getDestination({
    datasource,
    location,
    words,
    past,
    table,
  })
  const { path } = datasource
  //. handle editing part of a file, or json item, etc -
  // get text repr, edit, then parse / insert it
  // note: code is vscode
  //. could have diff editors for diff file types, eg image editor
  exec(`code ${path}`, (error, stdout, stderr) => {
    print('done')
  })
}
edit.notes = `Edit notes for a node`

//------------------------------------------------------------------------
// go
//------------------------------------------------------------------------

async function go({ datasource, location, words, past, table }) {
  //. maybe this should return a node?
  const destination = libcommands.getDestination({
    datasource,
    location,
    words,
    past,
    table,
  })
  datasource = destination.datasource
  location = destination.location
  // console.log(65, datasource, location)

  // get node of new location
  const node = await datasource.get(location)
  const type = await node.get('type')

  // if new node is a mount point, replace it with the target
  //. move this into getDestination also - want it for 'edit index.md' etc
  if (type === 'mount') {
    const driverName = await node.get('driver')
    const driver = drivers[driverName]
    datasource = await driver.connect(location)
    location = await datasource.get('initialLocation')
  }

  // await look({ datasource, location })
  await look({ destination })

  // past.push({ datasource, location })
  past.push(destination)

  // return { datasource, location }
  return destination
}
go.notes = `Go to another location, or in a direction`

//------------------------------------------------------------------------
// help
//------------------------------------------------------------------------

async function help({ words }) {
  //. handle asking for help on a topic
  // const topic = words[1]
  const rows = Object.keys(commands)
    .filter(key => commands[key].notes)
    .sort((a, b) => a.localeCompare(b))
    .map(key => [key, commands[key].notes])
  // .map(key => ({ command: key, description: commands[key].notes }))
  //. add aliases to col0 or col2
  print(rows)
  //. print with treetable view on an array of arrays - pass as datasource
  // const meta = {
  //   columns: 'command,description,aliases'.split(',')
  // }
  // const table = await views.treetable({rows, meta})
  // print(table)
}
help.notes = `Get help`

//------------------------------------------------------------------------
// info
//------------------------------------------------------------------------

async function info({ datasource, location, words, past }) {
  print({ datasource, location, words, past })
}
info.notes = `Get debugging info`

//------------------------------------------------------------------------
// look
//------------------------------------------------------------------------

async function look({ datasource, location, words = [] }) {
  // const destination = libcommands.getDestination({
  //   datasource,
  //   location,
  //   words,
  //   past,
  //   table,
  // })
  const node = await datasource.get(location)
  const name = await node.get('name')
  const path = await node.get('path')
  const type = await node.get('type')
  const notes = ((await node.get('notes')) || '').slice(0, 60) //.
  const source = await node.get('source')
  const contents = await node.get('contents')
  const exits = await node.get('exits')
  const printRow = (name, value) => print(name + ':', value)
  //. use metadata to determine what props to include, and order
  printRow('name', name)
  printRow('path', path)
  if (type) printRow('type', type)
  if (notes) printRow('notes', notes)
  if (source) printRow('source', source)
  if (contents && contents.length > 0) printRow('contents', contents.join(', '))
  if (exits && exits.length > 0) printRow('exits', exits.join(', '))
}
look.notes = `Look at this or another location`

//------------------------------------------------------------------------
// list
//------------------------------------------------------------------------

async function list({ datasource, location, words }) {
  // const destination = libcommands.getDestination({
  //   datasource,
  //   location,
  //   words,
  //   past,
  //   table,
  // })
  const node = await datasource.get(location)
  const name = await node.get('name')
  //. use metadata to determine what cols to include, sort, group, and order, etc.
  //. this will have default cols, and store modifications with item, or type, or location etc.
  const meta = {
    columns: 'n,name,size,created,modified'.split(','),
  }
  //. attach data to view, execute it
  //. maybe treetable returns a new View object, like driver.connect()?
  //. pass obj
  const table = await views.treetable({
    node,
    prop: 'contents',
    meta,
    datasource,
  })
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
