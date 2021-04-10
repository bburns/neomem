// neomem-console
// this repl (read-eval-print-loop) will translate from english-like language
// to graphql queries, and format the results nicely.

const repl = require('repl') // node lib
const commands = require('./commands')
const tokenize = require('./tokenize')

// define nmdata endpoint
//. pass as parameter
const uri = 'http://localhost:4000'
console.log('uri', uri)

// define prompt
// const prompt = '|> '
//. show current location in dataspace
const prompt = '[neomem] > '

// start the repl
repl.start({ prompt, eval: evalCommand })

// parse command string into a fn and execute it.
// parameters are specified by node's repl library.
async function evalCommand(commandString, context, filename, callback) {
  const tokens = tokenize(commandString)
  const command = commands[tokens[0]] // eg list
  if (command) {
    try {
      await command(tokens, uri) // call the command fn - may print to console
    } catch (error) {
      return callback(error)
    }
  } else {
    console.log('Unknown command')
  }
  // need to call callback so it knows to print prompt again
  callback()
}
