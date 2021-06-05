import repl from 'repl' // node lib - lots of options https://nodejs.org/api/repl.html

const welcome = `
Welcome to Neomem
-----------------------------------------------------`
const prompt = '=> '

console.log(welcome)

// parse command string into a fn and execute it.
// note: these parameters are specified by node's repl library.
const step = async (str, oldContext, filename, callback) => {
  // const { output, context } = await evaluate(str, oldContext)
  // print(output)
  // oldContext.locationId = context.locationId
  // const location = await context.connection.get(context.locationId)
  // print(decorateLocation(location))
  callback() // so knows to print prompt again
}

const server = repl.start({ prompt, eval: step })
