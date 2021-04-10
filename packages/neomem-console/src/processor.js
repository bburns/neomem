// action processor with execute, undo, redo, and history

const history = []

/******************************************************
 * Execute the given action object.
 * @param action {TAction}
 *****************************************************/
async function execute(action) {
  await action.execute() // print to console, may update context
  if (action.undo) {
    history.push(action)
  }
}

async function undo(options) {
  //. will want to keep the item in history but move a pointer,
  // so can run redo also.
  const action = history.pop()
  if (action) {
    await action.undo(options)
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
