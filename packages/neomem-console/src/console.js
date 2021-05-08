// console ui

import repl from 'repl' // node lib - lots of options https://nodejs.org/api/repl.html
import R from 'rambda' // functional programming lib https://ramdajs.com/
import chalk from 'chalk' // color text https://github.com/chalk/chalk
import commands from './commands.js'

const welcome = `
Welcome to Neomem
-----------------------------------------------------`
const prompt = '=> '
let location = '/'

// @ts-ignore
const print = console.log
const decorateLocation = location => chalk.bold(`\n[${location}]`)

export const makeConsole = () => evaluate

export const runConsole = evaluate => {
  print(welcome)
  print(decorateLocation(location))
  const server = repl.start({ prompt, eval: foo })
  server.context.location = location // context gets passed to eval fn
}

// parse command string into a fn and execute it.
// note: these parameters are specified by node's repl library.
const foo = async (str, oldContext, filename, callback) => {
  const { output, context } = await evaluate(str, oldContext)
  print(output)
  oldContext.location = context.location
  print(decorateLocation(context.location))
  callback() // so knows to print prompt again
}

const evaluate = async (str, context = {}) =>
  await run(parse(tokenize(str)), context)

const tokenize = R.pipe(R.trim, R.split(' '))

// const parse = tokens => {
//   const verb = tokens[0]
//   const command = commands[verb] || commands.unknown
//   return command(tokens)
// }
const parse = tokens => (commands[tokens[0]] || commands.unknown)(tokens)

const run = (cmd, context) => cmd(context)
