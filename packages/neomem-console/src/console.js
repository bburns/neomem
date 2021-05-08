// console ui

import repl from 'repl' // node lib - lots of options https://nodejs.org/api/repl.html
import R from 'rambda' // functional programming lib https://ramdajs.com/
import chalk from 'chalk' // color text https://github.com/chalk/chalk

const welcome = `
Welcome to Neomem
-----------------------------------------------------`
const prompt = '=> '
let location = '/'

const print = console.log
const printLocation = location => print(chalk.bold(`\n[${location}]`))

// make and return a console object. run it with console.start()
export function makeConsole(api) {
  print(welcome)
  printLocation(location)
  const server = repl.start({ prompt, eval: evalString })
  server.context.location = location // pass location to eval fn
}

// parse command string into a fn and execute it.
// note: these parameters are specified by node's repl library.
async function evalString(str, context, filename, callback) {
  // @ts-ignore
  // const output = R.pipe(tokenize, parse, run)(str)
  const output = run(parse(tokenize(str)), context)
  print(output)
  printLocation(context.location)
  callback() // so knows to print prompt again
}

const tokenize = str => {
  return str.trim().split(' ')
}

const parse = tokens => {
  const command = tokens[0]
  if (command === 'look') {
    // return context => 'i see a cardinal'
    return look
  } else if (command === 'go') {
    // return context => (context.location = tokens[1])
    return goFactory(tokens)
  }
}

const run = (cmd, context, tokens) => {
  if (typeof cmd === 'function') {
    return cmd(context, tokens)
  }
  return 'huh?'
}

const look = context => 'i see a cardinal'

const goFactory = tokens => context => (context.location = tokens[1])
