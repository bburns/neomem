// this repl (read-eval-print-loop) translates english-like language commands
// to rest api queries, and formats the results.

import repl from 'repl' // node lib - https://nodejs.org/api/repl.html
import chalk from 'chalk' // color text
import { Action } from './action.js'
import { Processor } from './processor.js'

// ui callbacks
const ui = {
  print: console.log,
}

function printWelcome() {
  ui.print()
  ui.print('Welcome to Neomem')
  ui.print('------------------------------------------------------------------')
}

function printLocation(context) {
  ui.print(chalk.bold(`\n[${context.location}]`))
}

// parse command string into a fn and execute it.
// note: these parameters are specified by node's repl library.
async function evalCommand(str, context, filename, callback) {
  const options = {
    context,
    ui,
    Processor,
  }
  // build an action object from the user's input string
  const action = Action.make(str.trim(), options)
  try {
    await Processor.execute(action) // execute the action object
  } catch (error) {
    return callback(error)
  }
  printLocation(context)
  callback() // so knows to print prompt again
}

// make and return a console object. run it with console.start()
function make(config) {
  const context = {
    base: config.base,
    location: config.location,
  }
  function start() {
    printWelcome()
    printLocation(context)
    const replServer = repl.start({ prompt: config.prompt, eval: evalCommand })
    replServer.context = context // this is how you pass context to the repl?
  }
  return {
    start,
  }
}

const Console = {
  make,
}

export { Console }
