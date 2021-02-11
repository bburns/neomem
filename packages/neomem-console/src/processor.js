// command processor and history

const history = []

const processor = {
  execute: async command => {
    await command.execute() // print to console, may update context
    if (command.undo) {
      history.push(command)
    }
  },

  undo: async options => {
    const command = history.pop()
    if (command) {
      await command.undo(options)
    } else {
      options.ui.print(`No more history to undo.`)
    }
  },

  history: _ => {
    return history
  },
}

module.exports = processor
