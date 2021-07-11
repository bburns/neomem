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
  const readline = libreadline.createInterface({
    input: process.stdin,
    output: process.stdout,
    // prompt,
  })
  readline.on('line', handleLine)
  readline.on('close', handleClose)

  const ui = new Ui(readline)

  let datasource = drivers[filedriver].connect(filepath)
  // let datasource = drivers.connect(connectionString) //.
  let path = (await datasource.get('initialPath')) || ''
  let location = { datasource, path }
  let table = null

  await ui.print(welcome)
  const ret = await commands.look({ location, ui })
  await ui.print(ret.output)
  await ui.print()

  const getPrompt = location =>
    `${chalk.bold(
      // '[' + chalk.gray(location.datasource.type + '://') + location.path + ']'
      '[' + location.path + ']'
    )}\n> `
  const prompt = getPrompt(location)
  const past = [location] // array of previous locations
  readline.setPrompt(prompt)

  readline.prompt() // print prompt, accept input, call handleLine

  // parse and execute command string
  async function handleLine(line) {
    ui.reset()
    const str = line.trim()
    const words = str.split(' ') //. getTokens(str)
    const command = words[0] //. getCommand(tokens), or commandFn = getCommandFn(tokens)
    const commandFn = commands[command] || aliases[command] || commands.unknown
    const ret = await commandFn({ location, words, past, table, ui }) // execute cmd
    // update vars if needed
    if (ret) {
      if (ret.location) location = ret.location
      if (ret.table) table = ret.table
      if (ret.output) {
        await ui.print(ret.output)
      }
      if (ret.view) {
        printView(ret.view)
      }
    }
    await ui.print()
    const prompt = getPrompt(location)
    readline.setPrompt(prompt)
    readline.prompt()
  }

  function handleClose() {
    console.log('Goodbye...')
    process.exit(0)
  }

  async function printView(view) {
    const rows = view.rows() // get generator/iterator
    for (let row of rows) {
      await ui.print(row)
    }
  }
}

main()
