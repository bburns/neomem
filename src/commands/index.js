// command handler functions

import chalk from 'chalk' // color text https://github.com/chalk/chalk
import { views } from '../views/index.js'
import * as libcommands from './libcommands.js'
// import * as lib from '../lib.js'

//. make a ui object, pass to each cmd. use to get disambiguation etc
// const print = console.log

//------------------------------------------------------------------------
// back
//------------------------------------------------------------------------

async function back({ past, ui }) {
  if (past.length > 1) {
    past.pop()
    const previous = past[past.length - 1]
    await look({ location: previous.location, ui })
    return { location: previous }
  }
  await ui.print(`No more history.`)
}
back.notes = `Go back to previous location`

//------------------------------------------------------------------------
// edit
//------------------------------------------------------------------------

async function edit({ location, words, past, table, ui }) {
  location = await libcommands.getDestination({ location, words, past, table })
  const node = await location.datasource.get(location.path)

  // node's datasource should know how to handle the edit cmd -
  // eg see drivers/orgmode js
  await node.edit('notes')

  //. could have diff editors for diff file types, eg image editor
}
edit.notes = `Edit notes for this or another location`

//------------------------------------------------------------------------
// go
//------------------------------------------------------------------------

async function go({ location, words, past, table, ui }) {
  location = await libcommands.getDestination({ location, words, past, table })
  const ret = await look({ location, ui })
  const output = ret.output
  past.push(location)
  return { location, output }
}
go.notes = `Go to another location, or in a direction`

//------------------------------------------------------------------------
// help
//------------------------------------------------------------------------

async function help() {
  const objs = Object.keys(commands)
    .sort()
    .filter(key => commands[key].notes)
    .map(key => ({
      command: key,
      description: commands[key].notes,
      aliases: aliasesReverse[key],
    }))
  const meta = { columns: 'command,description,aliases'.split(',') }
  // const rows = await views.table({ objs, meta })
  // return { output: rows }
}
help.notes = `Get help`

//------------------------------------------------------------------------
// info
//------------------------------------------------------------------------

async function info({ datasource, location, words, past }) {
  const output = { datasource, location, words, past }
  return { output }
}
info.notes = `Get debugging info`

//------------------------------------------------------------------------
// look
//------------------------------------------------------------------------

async function look({ location, ui, words = [], past = [], table = {} }) {
  location = await libcommands.getDestination({ location, words, past, table })
  const node = await location.datasource.get(location.path)
  const name = await node.get('name')
  await ui.print(chalk.bold(name))
  //. attach data to view, execute it
  //. maybe treetable returns a new View object, like driver.connect()?
  //. use metadata to determine what cols to include, sort, group, and order, etc.
  //. this will have default cols, and store modifications with item, or type, or location etc.
  const meta = {
    columns:
      'name,path,type,notes,source,contents,exits,created,modified'.split(','),
    includeSelf: true,
  }
  const nodes = await libcommands.getRelated({ node, meta })
  // now 'pipe' the nodes json to the properties view.
  // this is kind of like the gui, with the user selecting the properties view.
  const rows = await views.properties({ objs: nodes, meta })
  //. output of command could be an object with a print cmd that pulls data
  // from a bound datasource? then ui could do paging?
  return { output: rows }
}
look.notes = `Look at this or another location`
look.alias = 'l'

//------------------------------------------------------------------------
// list
//------------------------------------------------------------------------

async function list({ location, ui, words = [], past = [], table = {} }) {
  location = await libcommands.getDestination({ location, words, past, table })
  const node = await location.datasource.get(location.path)
  const name = await node.get('name')
  await ui.print(chalk.bold(name))
  //. use metadata to determine what cols to include, sort, group, and order, etc.
  //. this will have default cols, and store modifications with item, or type, or location etc.
  const meta = {
    columns: 'name,type,size,created'.split(','),
    includeSelf: false,
    axis: 'contents',
  }
  // const nodes = await libcommands.getRelated({ node, meta })
  // const rows = await views.table({ objs: nodes, meta })
  // //. wrap rows in a table structure with meta, axis, node
  // return { output: rows }
  //. output of command could be an object with a print cmd that pulls data
  // from a bound datasource? then ui could do paging?
  // ui could also then reference rows by number from the output like 'go 4' etc.
  // return { table }

  // get a source object that wraps the node and further queries,
  // and bind that to a table view object. the ui will render the view.
  const source = libcommands.getSource({ node, meta })
  const view = views.table({ source })
  return { view }
}
list.notes = `List contents of this or another location`

//------------------------------------------------------------------------
// read
//------------------------------------------------------------------------

async function read({ location, ui, words = [], past = [], table = {} }) {
  location = await libcommands.getDestination({ location, words, past, table })
  const node = await location.datasource.get(location.path)
  const name = await node.get('name')
  await ui.print(chalk.bold(name))
  //. use metadata to determine what cols to include, sort, group, and order, etc.
  //. this will have default cols, and store modifications with item, or type, or location etc.
  const meta = {
    columns: 'name,notes'.split(','),
    includeSelf: false,
    axis: 'contents',
  }
  const objs = await libcommands.getRelated({ node, meta })
  //. return a View object with method to render as string etc?
  //. or a closure with fns to render data?
  //. or json object with { meta, nodes, edges, history }?
  // some standard output
  const rows = await views.document({ objs, meta })
  return { output: rows }
}
read.notes = `Read contents of this or another location`

//------------------------------------------------------------------------
// unknown
//------------------------------------------------------------------------

async function unknown({ words, ui }) {
  // console.log({ words })
  if (words[0]) {
    await ui.print('Huh?')
  }
}
// unknown.alias = 'undefined'

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

// export const aliases = {
//   l: look,
// }

// get aliases
export const aliases = {} // eg { l: look }
const aliasesReverse = {} // eg { look: 'l' } //. or better - { look: ['l']}
Object.values(commands).forEach(command => {
  // @ts-ignore
  const names = (command.alias || '').split(',') // eg ['l']
  names.forEach(name => (aliases[name] = command))
  aliasesReverse[command.name] = names.join(', ') // eg 'l'
})
