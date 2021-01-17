// neomem-console

// this repl (read-eval-print-loop) will translate from english-like language
// to graphql queries, and format the results nicely.
// currently just lets you enter a graphql query directly.

const repl = require('repl')
const commands = require('./commands')

// const prompt = '|> '
const prompt = '[neomem] > '

repl.start({ prompt, eval: evalCommand })

async function evalCommand(cmd, context, filename, callback) {
  const command = commands[cmd.trim()]
  await command()
  // need to call callback so it knows to print prompt again.
  // wraps output in quotes, so don't use that here.
  const error = null
  const output = null
  callback(error, output)
}
