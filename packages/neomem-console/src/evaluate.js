// console command evaluator

import R from 'rambda' // functional programming lib https://ramdajs.com/
import commands from './commands.js'

export const evaluate = (str, context) => parse(tokenize(str))(context)
// export const getEvaluate = str => parse(tokenize(str))

const tokenize = R.pipe(R.trim, R.split(' '))

// returns a command fn, which can be executed with a context.
const parse = tokens => {
  const verb = tokens[0]
  const command = commands[verb] || commands.unknown
  return command(tokens)
}

// export const evaluate = R.pipe(parse, tokenize)
