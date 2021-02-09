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

// parse command string into a fn and execute it.
// parameters are specified by node's repl library.
async function evalCommand(str, context, filename, callback) {
  const command = Command.make(str, context, ui)
  if (command) {
    try {
      // call the command fn - may print to console, update context
      await command.execute()
    } catch (error) {
      return callback(error)
    }
  } else {
    ui.print(`Unknown command '${str.trim()}'.`)
  }
  printLocation(context)
  // need to call callback so it knows to print prompt again
  callback()
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
