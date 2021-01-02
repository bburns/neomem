import * as utils from 'neomem-utils'
import makeSource from '../src/index.js'


const ui = {
  question: (q, defaultValue) => {
    console.log(q) 
    return defaultValue
  },
}

const source = makeSource()
await source.open(config)

const lines = `
look
`.trim().split('\n')
// list
// look inbox
// list inbox
// look home

for (const line of lines) {
  console.log('>', line)
  const words = line.split(' ')
  const verb = words[0]
  const path = words[1]
  const params = { source, path, maxDepth: 1, ui }
  const cmd = source.api[verb](params) // factory method returns a command object
  const output = await cmd.execute() // execute the command, recursing if needed
  console.log(output)
  utils.printOutput(output)
}


await source.close()

