// commands
// commands are factories that take tokens and return
// a function that evaluates with those tokens and a context.

//------------------------------------------------------------------------
// go
//------------------------------------------------------------------------
const go = tokens => async context => {
  const noun = tokens[1]
  const location = await context.connection.get({ name: noun })
  if (location) {
    const contextCopy = { ...context, locationId: location.id }
    return { output: 'Went to ' + noun, context: contextCopy }
  }
  return { output: `Don't know that place.`, context }
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
  const noun = tokens[1]
  const spec = noun ? { name: noun } : context.locationId
  const location = await context.connection.get(spec)
  return { output: location.name + '\n' + location.notes, context }
}
look.description = `Look at current location or other item.`

//------------------------------------------------------------------------
// list
//------------------------------------------------------------------------
const list = tokens => async context => {
  const noun = tokens[1]
  const spec = noun ? { name: noun } : context.locationId
  const location = await context.connection.get(spec)
  const spec2 = { from: location.id } //. uhh
  const items = await context.connection.get(spec2)
  const strout = items.map(item => item.name).join(', ')
  return { output: strout, context }
}
list.description = `List items at current or other location.`

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
  list,
  unknown,
}

export default commands
