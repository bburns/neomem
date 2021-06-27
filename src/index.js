// console ui
// console interface to neomem
// based on https://nodejs.org/api/readline.html#readline_example_tiny_cli
// originally used https://nodejs.org/api/repl.html but nowork with text editor

import libreadline from 'readline' // node lib
// import { execSync } from 'child_process' // node lib
import chalk from 'chalk' // color text https://github.com/chalk/chalk
import { drivers } from './drivers/index.js' // data source drivers
import { commands, aliases } from './commands/index.js' // command handlers

const filepath = './src/data/index.js' //. pass via envar or param
const filedriver = 'jsonTimegraph' //. ditto, until can automate it
//. const connectionString = 'file://src/data/index.js'

//. make a ui object
const print = console.log

const welcome = `
Welcome to Neomem
-----------------------------------------------------`

async function main() {
  // let datasource = drivers.connect(connectionString) //.
  let datasource = drivers[filedriver].connect(filepath)
  let path = await datasource.get('initialPath')
  let location = { datasource, path }
  let table = null

  print(welcome)
  const ret = await commands.look({ location })
  print(ret.output)
  print()

  const getPrompt = location =>
    `${chalk.bold(
      '[' + location.datasource.type + '://' + location.path + ']'
    )}\n> `
  const prompt = getPrompt(location)
  const past = [location] // array of previous locations

  const readline = libreadline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt,
  })

  readline.prompt()

  readline.on('line', handleLine)
  readline.on('close', handleClose)

  // parse and execute command string
  async function handleLine(line) {
    const str = line.trim()
    const words = str.split(' ') //. tokenize
    const command = words[0]
    const commandFn = commands[command] || aliases[command] || commands.unknown
    const ret = await commandFn({ location, words, past, table }) // execute cmd
    // update vars if needed
    if (ret) {
      if (ret.location) location = ret.location
      if (ret.table) table = ret.table
      if (ret.output) {
        print(ret.output)
      }
    }
    print()
    // repl.setPrompt(getPrompt(location))
    // callback() // so knows to print prompt again
    // }

    // switch (line.trim()) {
    //   case 'hello':
    //     console.log('world!')
    //     break
    //   case 'edit':
    //     // const shell = 'sh -c '
    //     const shell = ''
    //     const editor = 'micro' // works
    //     // const editor = 'nano' // nowork - freezes terminal
    //     const path = 'pokpok'
    //     const cmd = `${shell}${editor} ${path}`
    //     const result = execSync(cmd).toString()
    //     console.log({ result })
    //     break

    //   default:
    //     console.log(`Say what? I might have heard '${line.trim()}'`)
    //     break
    // }
    readline.prompt()
  }

  function handleClose() {
    console.log('Goodbye...')
    process.exit(0)
  }
}

main()
