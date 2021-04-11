// const { Console } from './console')
// const config from './config')
import { Console } from './console'
import config from './config'

const console = Console.make(config)
console.start()
