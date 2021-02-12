// build command object from input string

/**
 * @typedef {Object} TCommand
 * @property {string} str
 * @property {string[]} tokens
 * @property {function} execute
 * @property {function} undo?
 */

const tokenize = require('./tokenize')
const commands = require('./commands')

/**
 * make a command object from the given input string and options.
 * the command object has an execute fn and optional undo function.
 * @param str { string } the user's input, eg "list books/scifi"
 * @returns {TCommand}
 */
function make(str, options = {}) {
  const tokens = tokenize(str) // eg 'list books/scifi' -> ['list', 'books/scifi']
  const verb = tokens[0] // eg 'list'
  const execute = commands[verb] || commands.unknown // eg list fn
  options.tokens = tokens
  // save for undo go cmd
  options.preservedLocation = options.context ? options.context.location : ''
  const command = {
    str,
    tokens,
    execute: () => execute(options),
    undo: execute.undo, // optional undo
  }
  return command
}

const Command = {
  make,
}

module.exports = { Command }
