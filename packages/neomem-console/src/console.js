// console ui

import repl from 'repl' // node lib - lots of options https://nodejs.org/api/repl.html
import chalk from 'chalk' // color text https://github.com/chalk/chalk
import { evaluate } from './evaluate.js'
import { connect } from './driver-json.js' // driver
import { data } from './data.js'

const welcome = `
Welcome to Neomem
-----------------------------------------------------`
const prompt = '=> '
const locationId = 1
const print = console.log
const decorateLocation = location => chalk.bold(`\n[${location.name}]`)

const connection = connect(data)
const location = await connection.get(locationId)

print(welcome)
print(decorateLocation(location))

// parse command string into a fn and execute it.
// note: these parameters are specified by node's repl library.
const runStep = async (str, oldContext, filename, callback) => {
  const { output, context } = await evaluate(str, oldContext)
  print(output)
  oldContext.locationId = context.locationId
  const location = await context.connection.get(context.locationId)
  print(decorateLocation(location))
  callback() // so knows to print prompt again
}

// start repl and pass context to eval fn
const server = repl.start({ prompt, eval: runStep })
server.context.locationId = locationId
server.context.connection = connection
