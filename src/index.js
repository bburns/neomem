// console ui
// console interface to neomem

// based on https://nodejs.org/api/readline.html#readline_example_tiny_cli
// originally tried https://nodejs.org/api/repl.html but nowork with console text editors

import libreadline from 'readline' // node lib
import chalk from 'chalk' // color text https://github.com/chalk/chalk
import { drivers } from './drivers/index.js' // data source drivers
import { commands, aliases } from './commands/index.js' // command handlers

const filepath = './src/data/index.js' //. pass via envar or param
const filedriver = 'jsonTimegraph' //. ditto, until can automate it
//. const connectionString = 'file://src/data/index.js'

//. make a ui object with other methods
let pageWidth = 100
let pageHeight = 2

let nrow = 0
async function print(data) {
  const str = String(data)
  //. split str into lines, break at space before pageWidth
  const lines = [str]
  for (let line of lines) {
    console.log(line)
    nrow++
    if (nrow > pageHeight) {
      console.log('[more]')
      await getKeypress()
      nrow = 0
    }
  }
}

const ui = {
  print,
}

async function getKeypress() {
  return new Promise(resolve => {
    var stdin = process.stdin
    // without this, we would only get streams once enter is pressed
    stdin.setRawMode(true)
    // resume stdin in the parent process (node app won't quit all by itself
    // unless an error or process.exit() happens)
    stdin.resume()
    // i don't want binary, do you?
    stdin.setEncoding('utf8')
    // on any data into stdin
    stdin.on('data', function (key) {
      resolve(key.toString())
      // write the key to stdout all normal like
      // process.stdout.write(key)
    })
  })
}

const welcome = `
Welcome to Neomem
-----------------------------------------------------
`

async function main() {
  let datasource = drivers[filedriver].connect(filepath)
  // let datasource = drivers.connect(connectionString) //.
  let path = (await datasource.get('initialPath')) || ''
  let location = { datasource, path }
  let table = null

  await print(welcome)
  const ret = await commands.look({ location, ui })
  await print(ret.output)
  await print()

  const getPrompt = location =>
    `${chalk.bold(
      // '[' + chalk.gray(location.datasource.type + '://') + location.path + ']'
      '[' + location.path + ']'
    )}\n> `
  const prompt = getPrompt(location)
  const past = [location] // array of previous locations

  const readline = libreadline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt,
  })
  readline.on('line', handleLine)
  readline.on('close', handleClose)

  readline.prompt()

  // parse and execute command string
  async function handleLine(line) {
    const str = line.trim()
    const words = str.split(' ') //. tokenize
    const command = words[0]
    const commandFn = commands[command] || aliases[command] || commands.unknown
    const ret = await commandFn({ location, words, past, table, ui }) // execute cmd
    // update vars if needed
    if (ret) {
      if (ret.location) location = ret.location
      if (ret.table) table = ret.table
      if (ret.output) {
        await print(ret.output)
      }
      if (ret.view) {
        printView(ret.view)
      }
    }
    await print()
    const prompt = getPrompt(location)
    readline.setPrompt(prompt)
    readline.prompt()
  }

  function handleClose() {
    console.log('Goodbye...')
    process.exit(0)
  }
}

main()

async function printView(view) {
  const rows = view.rows() // get generator/iterator
  for (let row of rows) {
    await print(row)
  }
}
