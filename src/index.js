import repl from 'repl' // node lib - lots of options https://nodejs.org/api/repl.html
import chalk from 'chalk' // color text https://github.com/chalk/chalk
import { drivers } from './drivers/index.js'
import { commands, aliases } from './commands.js'

const filepath = './src/data/home.js' //. pass via envar or param

const print = console.log

const welcome = `
Welcome to Neomem
-----------------------------------------------------`

async function main() {
  let connection = drivers.jsonTimegraph.connect(filepath)
  let key = await connection.getInitialLocation()
  let table = null

  print(welcome)
  await commands.look({ connection, key })
  print()

  const getPrompt = key => `${chalk.bold('[' + key + ']')}\n> `
  const prompt = getPrompt(key)
  const past = [{ connection, key }]

  // parse and execute command string
  // note: these parameters are specified by node's repl library.
  async function step(str, context, filename, callback) {
    str = str.trim()
    const words = str.split(' ') //. tokenize
    const command = words[0]
    const fn = commands[command] || aliases[command] || commands.unknown
    const ret = await fn({ connection, key, words, past, table }) // execute cmd
    // update vars if needed
    if (ret) {
      if (ret.connection) connection = ret.connection
      if (ret.key) key = ret.key
      if (ret.table) table = ret.table
    }
    print()
    server.setPrompt(getPrompt(key))
    callback() // so knows to print prompt again
  }

  const server = repl.start({ prompt, eval: step })
}

main()
