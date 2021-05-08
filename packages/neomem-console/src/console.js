import repl from 'repl' // node lib https://nodejs.org/api/repl.html
import R from 'rambda' // functional programming lib https://ramdajs.com/
import chalk from 'chalk' // color text https://github.com/chalk/chalk

const defaultConfig = {
  welcome: `
Welcome to Neomem
-----------------------------------------------------`,
  location: '/',
  prompt: '=> ',
}

// make and return a console object. run it with console.start()
export function makeConsole(config) {
  config = { ...defaultConfig, ...config }
  function start() {
    console.log(config.welcome)
    // printLocation(context)
    printLocation(config)
    const replServer = repl.start({ prompt: config.prompt, eval: evalCommand })
    // @ts-ignore
    replServer.context = config // this is how you pass context to the repl?
  }
  return {
    start,
  }
}

function printLocation(context) {
  console.log(chalk.bold(`\n[${context.location}]`))
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
  function tokenize(str) {
    return str.trim().split(' ')
  }
  // @ts-ignore
  console.log(R.pipe(tokenize)(str))
  printLocation(context)
  console.log(str)
  callback() // so knows to print prompt again
}
