import repl from 'repl' // node lib - lots of options https://nodejs.org/api/repl.html
import chalk from 'chalk' // color text https://github.com/chalk/chalk
import { driver } from './driver-filesys/index.js'
// import { driver } from './driver-json/index.js'

const print = console.log
const welcome = `
Welcome to Neomem
-----------------------------------------------------`
const prompt = '=> '

print(welcome)

// json files
// let filepath = './data-flesys.json'
// let filepath = './data-neomem.json'
// let id = 1
// let key = 1

// filesys
let filepath = null
let key = 'README.md'

const connection = driver.connect()

// parse command string
// note: these parameters are specified by node's repl library.
const step = async (str, oldContext, filename, callback) => {
  str = str.trim()
  const words = str.split(' ')
  const command = words[0]
  //
  if (command === 'load') {
    await connection.load(filepath)
    //
  } else if (command === 'look' || command === 'l') {
    const node = await connection.get(key)
    const type = await node.get('type')
    print(chalk.bold(await node.get('name')))
    print(`type: ${await type.get('name')}`)
    //. what is notes/contents in terms of file vs folder?
    print(`notes: ${await node.get('notes')}`)
    print(`contents: ${await node.get('contents')}`)
    // print(`exits: ${connection.getExits(node)}`)
    //
  } else if (command === 'list') {
    const node = await connection.get(key)
    print(chalk.bold(await node.get('name')))
    //. what is notes/contents in terms of file vs folder?
    const contents = await node.get('contents')
    print(`contents: ${contents}`)
    //
  } else if (command === 'go') {
    //. dest can be adjacent edge name, node name, or abs path, or id
    // eg 'go north', 'go /home', 'go hello.txt', '2' ?
    const dest = words[1]
    key = dest
  }
  print()
  callback() // so knows to print prompt again
}

const server = repl.start({ prompt, eval: step })
