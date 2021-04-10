// run through some commands
// a good way to develop, but not great for testing lots of commands


import * as utils from 'neomem-utils'
import makeSource from '../src/index.js'


const rootPath = '../..'
const config = { rootPath }

const source = makeSource()
await source.open(config)


const ui = {
  display: console.log,
}

const rows = `
look
list
look /Users/bburns/Desktop
list /Users/bburns/Desktop
list packages
list /Users/bburns/Desktop/n*
`.trim().split('\n')

for (const row of rows) {
  console.log('>', row)
  const words = row.split(' ')
  const verb = words[0]
  const path = words[1]
  const params = { source, path }
  const cmd = source.api[verb](params)
  const output = await cmd.execute()
  utils.printOutput(output)
  console.log()
}

await source.close()
