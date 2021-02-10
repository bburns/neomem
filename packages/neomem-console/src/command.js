const tokenize = require('./tokenize')
const commands = require('./commands')

// function make(str, context, ui) {
// function make({ str, context, ui, history, processor }) {
function make(str, options) {
  const tokens = tokenize(str) // eg 'list books/scifi' -> ['list', 'books/scifi']
  const verb = tokens[0] // eg 'list'
  const execute = commands[verb] || commands.unknown // eg list fn
  options.tokens = tokens
  options.verb = verb
  const command = {
    str: str.trim(),
    // execute: _ => execute(tokens, context, ui),
    execute: _ => execute(options),
    // undo: _ => _,
  }
  return command
}

const Command = {
  make,
}

module.exports = { Command }
