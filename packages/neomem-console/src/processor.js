// command processor and history

const history = []

const processor = {
  execute: async command => {
    await command.execute() // print to console, may update context
    if (command.undo) {
      history.push(command)
    }
    console.log(history)
  },
  undo: async options => {
    const command = history.pop()
    if (command) {
      await command.undo(options)
    } else {
      options.ui.print(`No more history to undo.`)
    }
    console.log(history)
  },
}

module.exports = processor
