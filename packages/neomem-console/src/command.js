const tokenize = require('./tokenize')
const commands = require('./commands')

function make(str, context, ui) {
  const tokens = tokenize(str) // eg 'list books/scifi' -> ['list', 'books/scifi']
  const execute = commands[tokens[0]] || commands.unknown // eg list fn
  const command = {
    str,
    execute: _ => execute(tokens, context, ui),
    // undo: _ => _,
  }
  return command
}

const Command = {
  make,
}

module.exports = { Command }
