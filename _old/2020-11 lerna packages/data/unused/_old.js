
import neomem from '../src/index.js'

await neomem.open()

const lines = `
look
list
look neo4j
`.trim().split('\n')

for (const line of lines) {
  const words = line.split(' ')
  const verb = words[0]
  const path = words[1]
  const params = { source: neomem, path }
  const cmd = neomem.api[verb](params) // factory method returns a command object
  const output = await neomem.executeCommand(cmd) // execute command and put on stack
  console.log(output)
}

await neomem.close()
