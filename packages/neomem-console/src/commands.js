// commands
// commands are factories that take tokens and return
// a function that evaluates with those tokens and a context.

//------------------------------------------------------------------------
// go
//------------------------------------------------------------------------
const go = tokens => async context => {
  const noun = tokens[1]
  const location = { id: 2, name: noun } //.
  const contextCopy = { ...context, location }
  return { output: 'Went to ' + noun, context: contextCopy }
}
go.description = `Go to a new location.`

//------------------------------------------------------------------------
// help
//------------------------------------------------------------------------
const help = tokens => async context => ({
  // @ts-ignore
  output: Object.values(commands).filter(cmd => !cmd.hidden),
  context,
})
help.description = `Show list of available commands.`

//------------------------------------------------------------------------
// look
//------------------------------------------------------------------------
const look = tokens => async context => {
  const noun = (tokens && tokens[1]) || context.location.name
  const notes = context.connection.get(1).notes
  return { output: noun + '\n' + notes, context }
}
look.description = `Look at current location or other item.`

//------------------------------------------------------------------------
// unknown
//------------------------------------------------------------------------
const unknown = tokens => async context => ({ output: 'huh?', context })
unknown.hidden = true

//------------------------------------------------------------------------

// need this struct for help command
const commands = {
  go,
  help,
  look,
  unknown,
}

export default commands
