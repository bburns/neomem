import { Console } from './console.js'
import config from './config.js'

const console = Console.make(config)
console.start()
