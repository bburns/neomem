// neomem-console
// this repl (read-eval-print-loop) translates english-like language commands
// to rest api queries, and formats the results.

const repl = require('repl') // node lib - https://nodejs.org/api/repl.html
const chalk = require('chalk') // color text
const { Command } = require('./command')
const package = require('../package')

const prompt = '> '
const defaultLocation = '/'

// define the ui callbacks
const ui = {
  print: console.log,
}

function printWelcome() {
  ui.print()
  ui.print('Welcome to Neomem')
  ui.print(`Version ${package.version}`)
  ui.print(
    '--------------------------------------------------------------------------'
  )
}

function printLocation(context) {
  ui.print(chalk.bold(`\n[${context.location}]`))
}

const history = []
const processor = {
  execute: async command => {
    await command.execute() // print to console, may update context
    history.push(command)
    console.log(history)
  },
}

// parse command string into a fn and execute it.
// parameters are specified by node's repl library.
async function evalCommand(str, context, filename, callback) {
  const command = Command.make(str.trim(), context, ui)
  try {
    await processor.execute(command)
  } catch (error) {
    return callback(error)
  }
  printLocation(context)
  callback() // so knows to print prompt again
}

function make() {
  const context = {}
  function start(location = defaultLocation) {
    context.location = location
    printWelcome()
    printLocation(context)
    const replServer = repl.start({ prompt, eval: evalCommand })
    replServer.context = context
  }
  return {
    start,
  }
}

const Console = {
  make,
}

module.exports = { Console }
