// console ui

import repl from 'repl' // node lib - lots of options https://nodejs.org/api/repl.html
// import R from 'rambda' // functional programming lib https://ramdajs.com/
import chalk from 'chalk' // color text https://github.com/chalk/chalk
import * as commands from './commands.js'

const welcome = `
Welcome to Neomem
-----------------------------------------------------`
const prompt = '=> '
let location = '/'

const print = console.log
const printLocation = location => print(chalk.bold(`\n[${location}]`))

export const makeRunner = () => runner

export const runRunner = runner => {
  print(welcome)
  printLocation(location)
  const server = repl.start({ prompt, eval: evalString })
  server.context.location = location // context gets passed to eval fn
}

// parse command string into a fn and execute it.
// note: these parameters are specified by node's repl library.
const evalString = async (str, context, filename, callback) => {
  print(runner(str, context))
  printLocation(context.location)
  callback() // so knows to print prompt again
}

const runner = (str, context = {}) => run(parse(tokenize(str)), context)

const tokenize = str => str.trim().split(' ')

const parse = tokens => {
  const verb = tokens[0]
  const command = commands[verb] || commands.unknown
  return command(tokens)
}

const run = (cmd, context) => cmd(context)
