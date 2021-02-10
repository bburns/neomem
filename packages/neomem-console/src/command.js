const tokenize = require('./tokenize')
const commands = require('./commands')

// make a command object from the given input string and options
function make(str, options = {}) {
  const tokens = tokenize(str) // eg 'list books/scifi' -> ['list', 'books/scifi']
  const verb = tokens[0] // eg 'list'
  const execute = commands[verb] || commands.unknown // eg list fn
  options.tokens = tokens
  options.preservedLocation = options.context ? options.context.location : '' // so can undo go cmd
  const command = {
    str: str.trim(),
    tokens,
    execute: _ => execute(options),
    undo: execute.undo, // optional undo
  }
  return command
}

const Command = {
  make,
}

module.exports = { Command }
