// neomem-console

// this repl (read-eval-print-loop) will translate from english-like language
// to graphql queries, and format the results nicely.
// currently just lets you enter a graphql query directly.

const repl = require('repl')
const commands = require('./commands')

// define nmdata endpoint
const uri = 'http://localhost:4100'
console.log('uri', uri)

// define prompt
// const prompt = '|> '
const prompt = '[neomem] > '

// start the repl
repl.start({ prompt, eval: evalCommand })

// parse command string into a fn and execute it
async function evalCommand(commandString, context, filename, callback) {
  const words = commandString.trim().split(' ')
  const command = commands[words[0]] // eg 'list'
  const args = words.slice(1) // eg ['fish']
  if (command) {
    try {
      await command(args, uri) // call the command fn - may print to console
    } catch (error) {
      return callback(error)
    }
  } else {
    console.log('Unknown command')
  }
  // need to call callback so it knows to print prompt again
  callback()
}
