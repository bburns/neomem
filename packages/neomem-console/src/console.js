// neomem-console
// this repl (read-eval-print-loop) translates english-like language commands
// to rest api queries, and formats the results.

const repl = require('repl') // node lib - https://nodejs.org/api/repl.html
const chalk = require('chalk') // color text
const commands = require('./commands')
const tokenize = require('./tokenize')
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
async function evalCommand(commandString, context, filename, callback) {
  const tokens = tokenize(commandString) // eg 'list books/scifi' -> ['list', 'books/scifi']
  const command = commands[tokens[0]] // eg list fn
  if (command) {
    try {
      // call the command fn - may print to console, update context
      await command(tokens, context, ui)
    } catch (error) {
      return callback(error)
    }
  } else {
    ui.print(`Unknown command '${commandString.trim()}'.`)
  }
  // need to call callback so it knows to print prompt again
  printLocation(context)
  callback()
}

function make() {
  const context = {}
  function start(location = defaultLocation) {
    context.location = location
    printWelcome()
    printLocation(context)
    repl.start({ prompt, eval: evalCommand, context })
  }
  return {
    start,
  }
}

const Console = {
  make,
}

module.exports = { Console }
