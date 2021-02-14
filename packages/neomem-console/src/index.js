const { Console } = require('./console')
const { Config } = require('./config')

const console = Console.make(Config)
console.start()
