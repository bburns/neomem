// console ui
// console interface to neomem

// based on https://nodejs.org/api/readline.html#readline_example_tiny_cli
// originally tried https://nodejs.org/api/repl.html but nowork with console text editors

import libreadline from 'readline' // node lib
import chalk from 'chalk' // color text https://github.com/chalk/chalk
import { drivers } from './drivers/index.js' // data source drivers
import { commands, aliases } from './commands/index.js' // command handlers
import { Ui } from './ui.js'

const filepath = './src/data/index.js' //. pass via envar or param
const filedriver = 'jsonTimegraph' //. ditto, until can automate it
//. const connectionString = 'file://src/data/index.js'

const welcome = `
Welcome to Neomem
-----------------------------------------------------
`

async function main() {
  // create the readline interface for io
  const readline = libreadline.createInterface({
    input: process.stdin,
    output: process.stdout,
  })
  readline.on('line', handleLine)
  readline.on('close', handleClose)

  // make a ui object to handle io
  //. how/why this vs readline?
  const ui = new Ui(readline)

  // init vars
  // let datasource = drivers.connect(connectionString) //.
  let datasource = drivers[filedriver].connect(filepath)
  let path = (await datasource.get('initialPath')) || ''
  let view = null
  let location = { datasource, path, view } // each location
  const past = [location] // array of previous locations

  // print welcome and current location
  await ui.print(welcome)
  //. would prefer something brief, like name, type, path, and notes - how do?
  // specify props to include in look cmd here? make another cmd?
  const ret = await commands.look({ location, ui })
  await ui.printView(ret.view)
  await ui.print()

  // get prompt for a given location
  function getPrompt(location) {
    return `${chalk.bold(
      // '[' + chalk.gray(location.datasource.type + '://') + location.path + ']'
      '[' + location.path + ']'
    )}\n> `
  }

  // get and display prompt
  const prompt = getPrompt(location)
  readline.setPrompt(prompt)
  readline.prompt() // print prompt, accept input, call handleLine

  // parse and execute command string
  async function handleLine(line) {
    ui.resetPrint() // reset [more] handling
    const str = line.trim()
    const words = str.split(' ') //. getTokens(str)
    const command = words[0] //. getCommand(tokens), or commandFn = getCommandFn(tokens)
    const commandFn = commands[command] || aliases[command] || commands.unknown
    const ret = await commandFn({ location, words, past, ui }) // execute cmd
    // update vars if needed
    if (ret) {
      if (ret.location) location = ret.location
      // if (ret.table) table = ret.table
      if (ret.output) {
        await ui.print(ret.output)
      }
      if (ret.view) {
        await ui.printView(ret.view)
        // view = ret.view
      }
    }
    await ui.print()

    // get prompt and repeat
    const prompt = getPrompt(location)
    readline.setPrompt(prompt)
    readline.prompt()
  }

  function handleClose() {
    console.log('Goodbye...')
    process.exit(0)
  }
}

main()
