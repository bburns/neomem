const tokenize = require('./tokenize')
const commands = require('./commands')

// function make(str, context, ui) {
// function make({ str, context, ui, history, processor }) {
function make(str, options = {}) {
  const tokens = tokenize(str) // eg 'list books/scifi' -> ['list', 'books/scifi']
  const verb = tokens[0] // eg 'list'
  const execute = commands[verb] || commands.unknown // eg list fn
  options.tokens = tokens
  options.verb = verb
  options.preservedLocation = options.context.location
  const command = {
    str: str.trim(),
    tokens,
    execute: _ => execute(options),
    // undo: _ => execute.undo(options), // optional undo
    undo: execute.undo, // optional
  }
  return command
}

const Command = {
  make,
}

module.exports = { Command }
