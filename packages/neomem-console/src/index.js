import { makeConsole } from './console.js'

const config = {
  base: 'http://localhost:4000/',
}

const console = makeConsole(config)
console.start()
