import repl from 'repl' // node lib - lots of options https://nodejs.org/api/repl.html
import chalk from 'chalk' // color text https://github.com/chalk/chalk
import { drivers } from './drivers/index.js'
import { commands, aliases } from './commands.js'

const filepath = './src/data/home.json' //. pass via envar or param

const print = console.log
const log = (...args) => print(chalk.gray(...args))

const welcome = `
Welcome to Neomem
-----------------------------------------------------`
const prompt = '> '

;(async function () {
  let connection = drivers.jsonTimegraph.connect()
  await connection.load(filepath)
  let key = connection.getInitialLocation()

  print(welcome)
  await commands.look(connection, key)
  print()

  const past = [{ connection, key }]

  // parse and execute command string
  // note: these parameters are specified by node's repl library.
  const step = async (str, oldContext, filename, callback) => {
    str = str.trim()
    const words = str.split(' ') //. tokenize
    const command = words[0]
    const fn = commands[command] || aliases[command] || commands.unknown
    const ret = await fn(connection, key, words, past) // execute cmd
    if (ret) {
      if (ret.connection) connection = ret.connection
      if (ret.key) key = ret.key
      log('new key', key)
      past.push({ connection, key })
    }
    print()
    callback() // so knows to print prompt again
  }

  const server = repl.start({ prompt, eval: step })
})()
