// build an action object from input string
// an action object can be executed, put on a stack, optionally undone etc.

//. make an Action class/namespace?

import { Tokenizer } from './tokenizer.js'
import { Command } from './command.js'

/**
 * @typedef {Object} TAction
 * @property {string} str
 * @property {string[]} tokens
 * @property {function} execute
 * @property {function} undo?
 */

/**
 * Make an action object from the given input string and options.
 * The action object has an execute fn and optional undo function.
 * @param { string } str - the user's input, eg "list books/scifi"
 * @returns {TAction}
 */
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

export { Action }
