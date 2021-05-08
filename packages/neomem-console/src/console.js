// console ui

import repl from 'repl' // node lib - lots of options https://nodejs.org/api/repl.html
// import R from 'rambda' // functional programming lib https://ramdajs.com/
import chalk from 'chalk' // color text https://github.com/chalk/chalk

const welcome = `
Welcome to Neomem
-----------------------------------------------------`
const prompt = '=> '
let location = '/'

const print = console.log
const printLocation = location => print(chalk.bold(`\n[${location}]`))

// make and return a console object. run it with console.start()
export function makeConsole() {
  // return api => {
  print(welcome)
  printLocation(location)
  const server = repl.start({ prompt, eval: evalString })
  server.context.location = location // context gets passed to eval fn
  // }
}

export const runConsole = console => {
  print(welcome)
  printLocation(location)
  const server = repl.start({ prompt, eval: evalString })
  server.context.location = location // context gets passed to eval fn
}

// parse command string into a fn and execute it.
// note: these parameters are specified by node's repl library.
// async function evalString(str, context, filename, callback) {
const evalString = async (str, context, filename, callback) => {
  print(runner(str, context))
  printLocation(context.location)
  callback() // so knows to print prompt again
}

const runner = (str, context) => run(parse(tokenize(str)), context)

const tokenize = str => str.trim().split(' ')

const parse = tokens => {
  const command = tokens[0]
  if (command === 'look') {
    return lookFactory(tokens)
  } else if (command === 'go') {
    return goFactory(tokens)
  }
  return unknownFactory(tokens)
}

const run = (cmd, context) => cmd(context)

const lookFactory = tokens => context => 'i see a cardinal'
const goFactory = tokens => context => (context.location = tokens[1])
const unknownFactory = tokens => context => 'huh?'
