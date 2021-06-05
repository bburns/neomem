// console command evaluator
// takes a string and returns a command fn
// eg 'look' => fn look

import R from 'rambda' // functional programming lib https://ramdajs.com/
import commands from './commands.js'

export const evaluate = (str, context) => parse(tokenize(str))(context)

const tokenize = R.pipe(R.trim, R.split(' '))

// returns a command fn, which can be executed with a context.
const parse = tokens => {
  const verb = tokens[0]
  const command = commands[verb] || commands.unknown
  return command(tokens)
}
