import repl from 'repl' // node lib - lots of options https://nodejs.org/api/repl.html
import { driver as driverJson } from './driver-json/index.js'
import { commands } from './commands.js'

const filepath = './src/data/home.json' //. pass via envar or param

const print = console.log
const welcome = `
Welcome to Neomem
-----------------------------------------------------`
const prompt = '> '

;(async function () {
  print(welcome)
  let connection = driverJson.connect()
  await connection.load(filepath)
  let key = connection.getInitialLocation()
  await commands.look(connection, key)
  print()

  // parse command string
  // note: these parameters are specified by node's repl library.
  const step = async (str, oldContext, filename, callback) => {
    str = str.trim()
    const words = str.split(' ')
    const command = words[0]

    if (command === 'look' || command === 'l') {
      key = await commands.look(connection, key, words)
    } else if (command === 'edit') {
      await commands.edit(connection, key, words)
    } else if (command === 'go') {
      key = await commands.go(connection, key, words)
    } else if (command === 'list') {
      key = await commands.list(connection, key, words)
    } else {
      print('Huh?')
    }
    print()
    callback() // so knows to print prompt again
  }

  const server = repl.start({ prompt, eval: step })
})()
