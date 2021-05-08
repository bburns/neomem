// console ui

import repl from 'repl' // node lib - lots of options https://nodejs.org/api/repl.html
import R from 'rambda' // functional programming lib https://ramdajs.com/
import chalk from 'chalk' // color text https://github.com/chalk/chalk

const welcome = `
Welcome to Neomem
-----------------------------------------------------`
const prompt = '=> '
let location = '/'

// make and return a console object. run it with console.start()
export function makeConsole() {
  function start() {
    printWelcome(welcome)
    printLocation(location)
    const replServer = repl.start({ prompt, eval: evalString })
    replServer.context.location = location
  }
  return {
    start,
  }
}

const printWelcome = welcome => console.log(welcome)

const printLocation = location => console.log(chalk.bold(`\n[${location}]`))

const tokenize = str => str.trim().split(' ')

const parse = tokens => tokens

// parse command string into a fn and execute it.
// note: these parameters are specified by node's repl library.
async function evalString(str, context, filename, callback) {
  // const options = { context, ui, Processor }
  // // build an action object from the user's input string
  // const action = Action.make(str.trim(), options)
  // try {
  //   await Processor.execute(action) // execute the action object
  // } catch (error) {
  //   return callback(error)
  // }
  // @ts-ignore
  const cmd = R.pipe(tokenize, parse)(str)
  console.log(cmd)
  printLocation(context.location)
  callback() // so knows to print prompt again
}
