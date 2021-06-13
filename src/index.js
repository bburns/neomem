import librepl from 'repl' // node lib - lots of options https://nodejs.org/api/repl.html
import chalk from 'chalk' // color text https://github.com/chalk/chalk
import { drivers } from './drivers/index.js'
import { commands, aliases } from './commands.js'

//. specify as some kind of connection string eg 'file:src/data/index.js'?
const filepath = './src/data/index.js' //. pass via envar or param
const filedriver = 'jsonTimegraph' //. ditto, until can automate it

const print = console.log

const welcome = `
Welcome to Neomem
-----------------------------------------------------`

async function main() {
  let connection = drivers[filedriver].connect(filepath)
  let location = await connection.getInitialLocation()
  let table = null

  print(welcome)
  await commands.look({ connection, key: location })
  print()

  const getPrompt = location => `${chalk.bold('[' + location + ']')}\n> `
  const prompt = getPrompt(location)
  const past = [{ connection, key: location }]

  // parse and execute command string
  // note: these parameters are specified by node's repl library.
  async function step(str, context, filename, callback) {
    str = str.trim()
    const words = str.split(' ') //. tokenize
    const command = words[0]
    const commandFn = commands[command] || aliases[command] || commands.unknown
    const ret = await commandFn({
      connection,
      key: location,
      words,
      past,
      table,
    }) // execute cmd
    // update vars if needed
    if (ret) {
      if (ret.connection) connection = ret.connection
      if (ret.key) location = ret.key
      if (ret.table) table = ret.table
    }
    print()
    repl.setPrompt(getPrompt(location))
    callback() // so knows to print prompt again
  }

  const repl = librepl.start({ prompt, eval: step })
}

main()
