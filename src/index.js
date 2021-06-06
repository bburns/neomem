import repl from 'repl' // node lib - lots of options https://nodejs.org/api/repl.html
import chalk from 'chalk' // color text https://github.com/chalk/chalk
import { driver } from './driver-json/index.js'
// import { driver } from './driver-filesys/index.js'

const print = console.log
const welcome = `
Welcome to Neomem
-----------------------------------------------------`
const prompt = '=> '

print(welcome)

// json files
let filepath = './src/data/home.json'
let key = 1

const connection = driver.connect()
connection.load(filepath)

// parse command string
// note: these parameters are specified by node's repl library.
const step = async (str, oldContext, filename, callback) => {
  str = str.trim()
  const words = str.split(' ')
  const command = words[0]

  if (command === 'look' || command === 'l') {
    //
    const node = await connection.get(key)
    const type = await node.get('type')

    print(chalk.bold(await node.get('name')))
    print(`type: ${await type.get('name')}`)
    print(`notes: ${await node.get('notes')}`)
    print(`contents: ${await node.get('contents')}`)
    // print(`exits: ${connection.getExits(node)}`)
    //
  } else if (command === 'list') {
    //
    const node = await connection.get(key)
    // print(node)
    print(chalk.bold(await node.get('name')))
    const contents = await node.get('contents')
    if (typeof contents === 'string') {
      print(`contents: ${contents}`)
    } else {
      print(`contents:`)
      print(contents.join('\n'))
    }
    //
  } else if (command === 'go') {
    //
    //. dest can be adjacent edge name, node name, or abs path, or id
    // eg 'go north', 'go /home', 'go hello.txt', '2' ?
    const dest = words[1]
    key = dest
    //
  }
  print()
  callback() // so knows to print prompt again
}

const server = repl.start({ prompt, eval: step })
