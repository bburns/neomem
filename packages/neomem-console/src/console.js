// this repl (read-eval-print-loop) translates english-like language commands
// to rest api queries, and formats the results.

const repl = require('repl') // node lib - https://nodejs.org/api/repl.html
const chalk = require('chalk') // color text
const { Command } = require('./command')
const { Processor } = require('./processor')
const package = require('../package')

const prompt = '> '
const defaultLocation = '/'

// ui callbacks
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
  const options = {
    context,
    ui,
    Processor,
  }
  // build a command object from the user's input string
  const command = Command.make(str.trim(), options)
  try {
    await Processor.execute(command) // execute the command object
  } catch (error) {
    return callback(error)
  }
  printLocation(context)
  callback() // so knows to print prompt again
}

// make and return a console object. run it with console.start()
function make() {
  const context = {
    baseUrl,
    location,
  }
  function start() {
    printWelcome()
    printLocation(context)
    const replServer = repl.start({ prompt, eval: evalCommand })
    replServer.context = context // this is how you pass context to the repl
  }
  return {
    start,
  }
}

const Console = {
  make,
}

module.exports = { Console }
