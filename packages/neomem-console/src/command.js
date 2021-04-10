// build a command object from input string

//. make a Command class/namespace

/**
 * @typedef {Object} TCommand
 * @property {string} str
 * @property {string[]} tokens
 * @property {function} execute
 * @property {function} undo?
 */

const { Tokenizer } = require('./tokenizer')
const { Action } = require('./action')

/**
 * Make a command object from the given input string and options.
 * The command object has an execute fn and optional undo function.
 * @param { string } str - the user's input, eg "list books/scifi"
 * @returns {TCommand}
 */
function make(str, options = {}) {
  const tokens = Tokenizer.tokenize(str) // eg 'list books/scifi' -> ['list', 'books/scifi']
  const verb = tokens[0] // eg 'list'
  const execute = Action[verb] || Action.unknown // eg list fn
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
