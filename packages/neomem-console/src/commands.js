// commands
// commands are factories that take tokens and return
// a function that evaluates with those tokens and a context.

const go = tokens => context => {
  const noun = tokens[1]
  context.location = noun
  return 'Went to ' + noun
}
go.description = `Go to a new item.`

const help = tokens => context => commands
help.description = `Show list of available commands.`

const look = tokens => context => 'i see a cardinal'
look.description = `Look at and describe current or other item.`

const unknown = tokens => context => 'huh?'

// need this struct for help command
const commands = {
  go,
  help,
  look,
  unknown,
}

export default commands
