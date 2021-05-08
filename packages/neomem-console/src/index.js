import { makeConsole } from './console.js'

const config = {
  base: 'http://localhost:4000/',
  location: '/',
  // prompt: '> ',
}

const console = makeConsole(config)
console.start()
