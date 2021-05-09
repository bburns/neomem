// console ui

import repl from 'repl' // node lib - lots of options https://nodejs.org/api/repl.html
import chalk from 'chalk' // color text https://github.com/chalk/chalk
import { makeConsole } from './console.js'
import { connect } from './connect.js' // driver
import { data } from './data.js'

const welcome = `
Welcome to Neomem
-----------------------------------------------------`
const prompt = '=> '
// const location = { id: 1, name: 'lkmlkm' }
const locationId = 1
const print = console.log
const decorateLocation = location => chalk.bold(`\n[${location.name}]`)

const connection = connect(data)
const evaluate = makeConsole()

const location = connection.get(locationId)

print(welcome)
print(decorateLocation(location.name))

// parse command string into a fn and execute it.
// note: these parameters are specified by node's repl library.
const runStep = async (str, oldContext, filename, callback) => {
  const { output, context } = await evaluate(str, oldContext)
  print(output)
  // oldContext.location = context.location
  oldContext.locationId = context.locationId
  // print(decorateLocation(context.location))
  const location = context.connection.get(context.locationId)
  print(decorateLocation(location.name))
  callback() // so knows to print prompt again
}

// start repl and pass context to eval fn
const server = repl.start({ prompt, eval: runStep })
// server.context.location = location
server.context.locationId = locationId
server.context.connection = connection
