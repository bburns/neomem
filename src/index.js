import { exec } from 'child_process' // node lib
import repl from 'repl' // node lib - lots of options https://nodejs.org/api/repl.html
import chalk from 'chalk' // color text https://github.com/chalk/chalk
import { driver } from './driver-json/index.js'

const filepath = './src/data/home.json' //. pass via envar or param

const print = console.log
const welcome = `
Welcome to Neomem
-----------------------------------------------------`
const prompt = '> '

;(async function () {
  print(welcome)
  const connection = driver.connect()
  await connection.load(filepath)
  let key = connection.getInitialLocation()
  await look(connection, key)

  // parse command string
  // note: these parameters are specified by node's repl library.
  const step = async (str, oldContext, filename, callback) => {
    str = str.trim()
    const words = str.split(' ')
    const command = words[0]

    if (command === 'look' || command === 'l') {
      await look(connection, key)
      //
    } else if (command === 'list') {
      await list(connection, key)
      //
    } else if (command === 'go') {
      //. dest can be adjacent edge name, node name, or abs path, or id
      // eg 'go north', 'go /home', 'go hello.txt', 'go 2', 'go up'
      const dest = words[1]
      key = dest
      await look(connection, key)
      //
    } else if (command === 'edit') {
      exec('code pok.txt', (error, stdout, stderr) => {
        print('done')
      })
      // } else if (command === 'up') {
      //   key = '..'
    } else {
      print('Huh?')
    }
    print()
    callback() // so knows to print prompt again
  }

  async function look(connection, key) {
    const node = await connection.get(key)
    const name = await node.get('name')
    const type = await node.get('type')
    const typeName = await type.get('name')
    const notes = await node.get('notes')
    const source = await node.get('source')
    const contents = await node.get('contents')
    // const exits = await node.get('exits')

    print(chalk.bold(name))
    if (typeName) print(`type: ${typeName}`)
    if (notes) print(`notes: ${notes}`)
    if (source) print(`source: ${source}`) //. just for mounts
    if (contents && contents.length > 0) print(`contents: ${contents}`)
    // if (exits) print(`exits: ${exits}`) //. just for rooms etc
  }

  async function list(connection, key) {
    const node = await connection.get(key)
    const name = await node.get('name')
    const contents = await node.get('contents')

    print(chalk.bold(name))
    print(contents.join('\n'))
  }

  const server = repl.start({ prompt, eval: step })
})()
