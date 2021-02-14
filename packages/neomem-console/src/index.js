const { Console } = require('./console')
const config = require('./config')

const console = Console.make(config)
console.start()
