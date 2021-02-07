// neomem-console
// this repl (read-eval-print-loop) translates english-like language commands
// to rest api queries, and formats the results.

const repl = require('repl') // node lib - https://nodejs.org/api/repl.html
const commands = require('./commands')
const tokenize = require('./tokenize')
const package = require('../package')

// define prompt
//. how change this as cd changes?
const prompt = '\n[neomem] > '

// set current directory
global.location = '/'

// print welcome
console.log()
console.log('Welcome to Neomem')
console.log(`Version ${package.version}`)
console.log(
  '--------------------------------------------------------------------------'
)

// start the repl
repl.start({ prompt, eval: evalCommand })

// parse command string into a fn and execute it.
// parameters are specified by node's repl library.
async function evalCommand(commandString, context, filename, callback) {
  const tokens = tokenize(commandString)
  const command = commands[tokens[0]] // eg list fn
  if (command) {
    try {
      // call the command fn - may print to console, update context
      await command(tokens, context)
    } catch (error) {
      return callback(error)
    }
  } else {
    console.log('Unknown command')
  }
  // need to call callback so it knows to print prompt again
  callback()
}
