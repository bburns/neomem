import repl from 'repl' // node lib - lots of options https://nodejs.org/api/repl.html
import chalk from 'chalk' // color text https://github.com/chalk/chalk
import { makeConsole } from './console.js'
import { connect } from './connect.js' // driver
import { data } from './data.js'

const welcome = `
Welcome to Neomem
-----------------------------------------------------`
const prompt = '=> '
const location = '/'

const connection = connect(data)

const print = console.log
const decorateLocation = location => chalk.bold(`\n[${location}]`)

const evaluate = makeConsole()

print(welcome)
print(decorateLocation(location))

// parse command string into a fn and execute it.
// note: these parameters are specified by node's repl library.
const runStep = async (str, oldContext, filename, callback) => {
  const { output, context } = await evaluate(str, oldContext)
  print(output)
  oldContext.location = context.location
  print(decorateLocation(context.location))
  callback() // so knows to print prompt again
}

const server = repl.start({ prompt, eval: runStep })

// pass context to eval fn
server.context.location = location
server.context.connection = connection
