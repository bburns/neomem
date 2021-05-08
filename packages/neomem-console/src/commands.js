// commands
// commands are factories that take tokens and return
// a function that evaluates with those tokens and a context.

const go = tokens => context => {
  const noun = tokens[1]
  const contextCopy = { ...context, location: noun }
  return { output: 'Went to ' + noun, context: contextCopy }
}
go.description = `Go to a new item.`

const help = tokens => context => ({ output: commands, context })
help.description = `Show list of available commands.`

const look = tokens => context => ({ output: 'i see a cardinal', context })
look.description = `Look at and describe current or other item.`

const unknown = tokens => context => ({ output: 'huh?', context })

// need this struct for help command
const commands = {
  go,
  help,
  look,
  unknown,
}

export default commands
