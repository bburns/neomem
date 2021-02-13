// command processor with execute, undo, redo, and history

const history = []

/**
 * Execute the given command object.
 * @param command {TCommand}
 */
async function execute(command) {
  await command.execute() // print to console, may update context
  if (command.undo) {
    history.push(command)
  }
}

async function undo(options) {
  //. will want to keep the item in history but move a pointer,
  // so can run redo also.
  const command = history.pop()
  if (command) {
    await command.undo(options)
  } else {
    options.ui.print(`No more history to undo.`)
  }
}

async function redo() {}

function getHistory() {
  return history
}

const Processor = {
  execute,
  undo,
  redo,
  getHistory,
}

module.exports = { Processor }
