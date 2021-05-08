import repl from 'repl' // node lib - https://nodejs.org/api/repl.html
import R from 'rambda' // functional programming lib
import chalk from 'chalk' // color text

const defaultConfig = {
  prompt: '=> ',
  welcome: `
Welcome to Neomem
-----------------------------------------------------
`,
}

function printLocation(context) {
  console.log(chalk.bold(`\n[${context.location}]`))
}

// make and return a console object. run it with console.start()
export function makeConsole(config = defaultConfig) {
  const context = {
    base: config.base,
    location: config.location,
  }
  function start() {
    console.log(config.welcome)
    printLocation(context)
    const replServer = repl.start({ prompt: config.prompt, eval: evalCommand })
    // replServer.context = context // this is how you pass context to the repl?
  }
  // parse command string into a fn and execute it.
  // note: these parameters are specified by node's repl library.
  async function evalCommand(str, context, filename, callback) {
    // const options = { context, ui, Processor }
    // // build an action object from the user's input string
    // const action = Action.make(str.trim(), options)
    // try {
    //   await Processor.execute(action) // execute the action object
    // } catch (error) {
    //   return callback(error)
    // }
    printLocation(context)
    console.log(str)
    callback() // so knows to print prompt again
  }
  return {
    start,
  }
}
