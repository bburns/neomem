// build an action object from input string

//. make an Action class/namespace

/**********************************************************************************************************
 * @typedef {Object} TAction
 * @property {string} str
 * @property {string[]} tokens
 * @property {function} execute
 * @property {function} undo?
 *****************************************************/

const { Tokenizer } = require('./tokenizer')
const { Command } = require('./command')

/**********************************************************************************************************
 * Make an action object from the given input string and options.
 * The action object has an execute fn and optional undo function.
 * @param { string } str - the user's input, eg "list books/scifi"
 * @returns {TAction}
 *****************************************************/
function make(str, options = {}) {
  const tokens = Tokenizer.tokenize(str) // eg 'list books/scifi' -> ['list', 'books/scifi']
  const verb = tokens[0] // eg 'list'
  const command = Command[verb] || Command.unknown // eg list fn
  options.tokens = tokens
  // save for undo go cmd
  //. where put location history?
  options.preservedLocation = options.context ? options.context.location : ''
  const action = {
    str,
    tokens,
    execute: () => command(options),
    undo: command.undo, // optional undo
  }
  return action
}

const Action = {
  make,
}

module.exports = { Action }
