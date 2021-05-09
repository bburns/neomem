// console parser

import R from 'rambda' // functional programming lib https://ramdajs.com/
import commands from './commands.js'

const locationId = 1
const defaultContext = { locationId }

export const makeConsole = () => evaluate

//. make point-free?
const evaluate = async (str, context = defaultContext) =>
  await run(parse(tokenize(str)), context)

const tokenize = R.pipe(R.trim, R.split(' '))

// this will get complex, in order to handle disambiguation
const parse = tokens => {
  const verb = tokens[0]
  const command = commands[verb] || commands.unknown
  return command(tokens)
}

//. make point-free?
const run = (cmd, context) => cmd(context)
