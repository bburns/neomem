// console command evaluator

import R from 'rambda' // functional programming lib https://ramdajs.com/
import commands from './commands.js'

const locationId = 1
const defaultContext = { locationId }

export const makeConsole = () => evaluate

const evaluate = (str, context = defaultContext) =>
  parse(tokenize(str))(context)

// will get more complex to handle strings etc
const tokenize = R.pipe(R.trim, R.split(' '))

// returns a command fn, which takes a context
// this will get complex, in order to handle disambiguation
const parse = tokens => {
  const verb = tokens[0]
  const command = commands[verb] || commands.unknown
  return command(tokens)
}
