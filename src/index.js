import repl from 'repl' // node lib - lots of options https://nodejs.org/api/repl.html
import { driver as driverJson } from './driver-json/index.js'
import { commands, aliases } from './commands.js'

const filepath = './src/data/home.json' //. pass via envar or param

const print = console.log
const welcome = `
Welcome to Neomem
-----------------------------------------------------`
const prompt = '> '

;(async function () {
  let connection = driverJson.connect()
  await connection.load(filepath)
  let key = connection.getInitialLocation()

  print(welcome)
  await commands.look(connection, key)
  print()

  const past = [key]

  // parse and execute command string
  // note: these parameters are specified by node's repl library.
  const step = async (str, oldContext, filename, callback) => {
    str = str.trim()
    const words = str.split(' ') //. tokenize
    const command = words[0]
    const fn = commands[command] || aliases[command] || commands.unknown
    const ret = await fn(connection, key, words, past) // execute cmd
    if (ret) {
      key = ret
      console.log('new key', key)
      past.push(key)
    }
    print()
    callback() // so knows to print prompt again
  }

  const server = repl.start({ prompt, eval: step })
})()
