// console parser

import R from 'rambda' // functional programming lib https://ramdajs.com/
import commands from './commands.js'

// const location = '/'
const location = { id: 1, name: 'foo' }
const defaultContext = { location }

export const makeConsole = () => evaluate

const evaluate = async (str, context = defaultContext) =>
  await run(parse(tokenize(str)), context)

const tokenize = R.pipe(R.trim, R.split(' '))

const parse = tokens => {
  const verb = tokens[0]
  const command = commands[verb] || commands.unknown
  return command(tokens)
}

const run = (cmd, context) => cmd(context)
