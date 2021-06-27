// console ui
// based on https://nodejs.org/api/readline.html#readline_example_tiny_cli
// originally used https://nodejs.org/api/repl.html but couldn't get it to work with text editor

import libreadline from 'readline' // node lib
import { execSync } from 'child_process' // node lib
import chalk from 'chalk' // color text https://github.com/chalk/chalk
import { drivers } from './drivers/index.js' // data source drivers
import { commands, aliases } from './commands/index.js' // command handlers

const readline = libreadline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: '> ',
})

readline.prompt()

readline.on('line', line => {
  switch (line.trim()) {
    case 'hello':
      console.log('world!')
      break
    case 'edit':
      // const shell = 'sh -c '
      const shell = ''
      const editor = 'micro' // works
      // const editor = 'nano' // nowork - freezes terminal
      const path = 'pokpok'
      const cmd = `${shell}${editor} ${path}`
      const result = execSync(cmd).toString()
      console.log({ result })
      break

    default:
      console.log(`Say what? I might have heard '${line.trim()}'`)
      break
  }
  readline.prompt()
})

readline.on('close', () => {
  console.log('Have a great day!')
  process.exit(0)
})
