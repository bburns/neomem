import fs from 'fs'
import repl from 'repl' // node lib - lots of options https://nodejs.org/api/repl.html
import chalk from 'chalk' // color text https://github.com/chalk/chalk

import { driver } from './driver-filesys.js'
// import { driver } from './driver-json.js'

const print = console.log
const welcome = `
Welcome to Neomem
-----------------------------------------------------`
const prompt = '=> '

print(welcome)

// let path = './data-flesys.json'
// let path = './data-neomem.json'
// let id = 1

let path = '.'
let id = '.'

const connection = driver.connect()

// parse command string
// note: these parameters are specified by node's repl library.
const step = async (str, oldContext, filename, callback) => {
  str = str.trim()
  const words = str.split(' ')
  const command = words[0]
  //
  if (command === 'load') {
    await connection.load(path)
    //
  } else if (command === 'look' || command === 'l') {
    const node = connection.getNode(id)
    const type = connection.getType(node)
    print(chalk.bold(node.name))
    print(`type: ${type.name}`)
    print(`notes: ${node.notes}`)
    print(`contents: ${connection.getContents(node)}`)
    print(`exits: ${connection.getExits(node)}`)
    //
  } else if (command === 'list') {
    const node = connection.getNode(id)
    const contents = connection.getContents(node)
    print(chalk.bold(node.name))
    print(`contents: ${contents}`)
    //
  } else if (command === 'go') {
    // dest can be adjacent edge name, node name, or abs path, or id
    // eg 'go north', 'go /home', 'go hello.txt', '2' ?
    const dest = words[1]
    id = Number(dest)
  }
  // const { output, context } = await evaluate(str, oldContext)
  // print(output)
  // oldContext.locationId = context.locationId
  // const location = await context.connection.get(context.locationId)
  // print(decorateLocation(location))
  print()
  callback() // so knows to print prompt again
}

const server = repl.start({ prompt, eval: step })
