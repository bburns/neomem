// command handler functions

import { exec } from 'child_process' // node lib
import chalk from 'chalk' // color text https://github.com/chalk/chalk
import { views } from '../views/index.js'
// import * as lib from '../lib.js'
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
    await look({ location: previous.location })
    return previous
  }
  print(`No more history.`)
}
back.notes = `Go back to previous location`

//------------------------------------------------------------------------
// edit
//------------------------------------------------------------------------

async function edit({ location, words, past, table }) {
  location = await libcommands.getDestination({ location, words, past, table })
  // const { path } = location
  const node = await location.datasource.get(location.path)
  //. write node.notes to a tempfile, then edit it, save back when done
  console.log(await node.get('notes'))
  //. handle editing part of a file - a subheader, or json item, etc -
  // get text repr, edit, then parse / insert it
  //. could have diff editors for diff file types, eg image editor
  // const cmd = `code ${path}` // code is vscode
  // console.log(`Running '${cmd}'...`)
  // exec(cmd, (error, stdout, stderr) => {
  //   print('done')
  // })
}
edit.notes = `Edit notes for a node`

//------------------------------------------------------------------------
// go
//------------------------------------------------------------------------

async function go({ location, words, past, table }) {
  location = await libcommands.getDestination({ location, words, past, table })
  await look({ location })
  past.push(location)
  return { location }
}
go.notes = `Go to another location, or in a direction`

//------------------------------------------------------------------------
// help
//------------------------------------------------------------------------

async function help() {
  const objs = Object.keys(commands)
    .filter(key => commands[key].notes)
    .sort()
    .map(key => ({ command: key, description: commands[key].notes }))
  //. add aliases to col2
  const meta = {
    columns: 'command,description,aliases'.split(','),
  }
  //. const objs = await views.table({ node, axis: 'contents', meta })
  // const rows = libcommands.getRows(objs, meta.columns)
  const rows = await views.table({ objs, meta })
  print(rows)
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

async function look({ location, words = [], past = [], table = {} }) {
  // const notes = ((await node.get('notes')) || '').slice(0, 60) //.
  // const printRow = (name, value) => print(name + ':', value)
  location = await libcommands.getDestination({ location, words, past, table })
  const node = await location.datasource.get(location.path)
  const name = await node.get('name')
  print(chalk.bold(name))
  //. attach data to view, execute it
  //. maybe treetable returns a new View object, like driver.connect()?
  //. use metadata to determine what cols to include, sort, group, and order, etc.
  //. this will have default cols, and store modifications with item, or type, or location etc.
  const meta = {
    columns:
      'name,path,type,notes,source,contents,exits,created,modified'.split(','),
  }
  const objs = await libcommands.getRelated({ node, meta })
  const rows = await views.properties({ objs, meta })
  print(rows)
}
look.notes = `Look at this or another location`

//------------------------------------------------------------------------
// list
//------------------------------------------------------------------------

async function list({ location, words = [], past = [], table = {} }) {
  location = await libcommands.getDestination({ location, words, past, table })
  const node = await location.datasource.get(location.path)
  const name = await node.get('name')
  print(chalk.bold(name))
  //. use metadata to determine what cols to include, sort, group, and order, etc.
  //. this will have default cols, and store modifications with item, or type, or location etc.
  const meta = {
    columns: 'n,name,size,created,modified'.split(','),
  }
  const objs = await libcommands.getRelated({ node, meta, axis: 'contents' })
  const rows = await views.table({ objs, meta })
  print(rows)
  // return { table }
}
list.notes = `List contents of this or another location`

//------------------------------------------------------------------------
// read
//------------------------------------------------------------------------

async function read({ location, words = [], past = [], table = {} }) {
  // const notes = ((await node.get('notes')) || '').slice(0, 60) //.
  location = await libcommands.getDestination({ location, words, past, table })
  const node = await location.datasource.get(location.path)
  const name = await node.get('name')
  print(chalk.bold(name))
  //. use metadata to determine what cols to include, sort, group, and order, etc.
  //. this will have default cols, and store modifications with item, or type, or location etc.
  const meta = {
    columns: 'name,type,notes,source,contents,exits,created,modified'.split(
      ','
    ),
  }
  //. attach data to view, execute it
  //. maybe treetable returns a new View object, like driver.connect()?
  table = await views.document({ node, meta, axis: 'contents' })
  print(table)
  // const rows = libcommands.getRows(table, meta.columns)
  // print(rows)
  return { table }
}
list.read = `Read contents of this or another location`

//------------------------------------------------------------------------
// unknown
//------------------------------------------------------------------------

async function unknown() {
  print('Huh?')
}

//------------------------------------------------------------------------

export const commands = {
  back,
  edit,
  go,
  help,
  info,
  look,
  list,
  read,
  unknown,
}
export const aliases = { l: look }
