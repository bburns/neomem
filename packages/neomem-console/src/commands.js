// commands
// commands are factories that take tokens and return
// a function that evaluates with those tokens and a context.

//------------------------------------------------------------------------
// go
//------------------------------------------------------------------------
const go = tokens => async context => {
  const noun = tokens[1]
  const { connection } = context
  const location = connection.get({ name: noun })
  if (location) {
    const locationId = 1 //. lookup in connection
    const contextCopy = { ...context, locationId }
    return { output: 'Went to ' + noun, context: contextCopy }
  }
  return { output: `Don't know that place.` }
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
  const location = context.connection.get(context.locationId)
  const noun = (tokens && tokens[1]) || location.name
  const notes = location.notes
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
