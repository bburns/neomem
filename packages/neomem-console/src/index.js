// neomem-console
// this repl (read-eval-print-loop) translates english-like language commands
// to rest api queries, and formats the results nicely.

const repl = require('repl') // node lib - https://nodejs.org/api/repl.html
const commands = require('./commands')
const tokenize = require('./tokenize')

// define prompt
// const prompt = '|> '
//. show current location in dataspace
const prompt = '[neomem] > '

// start the repl
repl.start({ prompt, eval: evalCommand })

// parse command string into a fn and execute it.
// parameters are specified by node's repl library.
async function evalCommand(commandString, context, filename, callback) {
  // console.log('context', context, filename)
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
