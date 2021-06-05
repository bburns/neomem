import repl from 'repl' // node lib - lots of options https://nodejs.org/api/repl.html
import chalk from 'chalk' // color text https://github.com/chalk/chalk

const print = console.log
const welcome = `
Welcome to Neomem
-----------------------------------------------------`
const prompt = '=> '

print(welcome)

let data = {
  nodes: [
    { _id: 1, name: 'forest', type: 'place' },
    { _id: 2, name: 'clearing', type: 'place' },
    { _id: 3, name: 'south of house', type: 'place' },
    // meta db - store in separate silo - how? uuids? uids?
    { _id: 4, name: 'east', type: 'edge', reverse: 5, alias: ['e'] },
    { _id: 5, name: 'west', type: 'edge', reverse: 4, alias: ['w'] },
    { _id: 6, name: 'north', type: 'edge', reverse: 7, alias: ['n'] },
    { _id: 7, name: 'south', type: 'edge', reverse: 6, alias: ['s'] },
  ],
  edges: [
    { _from: 1, _to: 2, direction: 4, type: 'exit' },
    { _from: 1, _to: 3, direction: 6, type: 'exit' },
  ],
}

// let data = {}

let id = 1

const nodeIndex = {}
data.nodes.forEach(node => (nodeIndex[node._id] = node))

const edgeFromIndex = {}
data.edges.forEach(edge => {
  // (edgeFromIndex[edge._from] = edge)
  if (edgeFromIndex[edge._from]) {
    edgeFromIndex[edge._from].push(edge)
  } else {
    edgeFromIndex[edge._from] = [edge]
  }
})

// parse command string into a fn and execute it.
// note: these parameters are specified by node's repl library.
const step = async (str, oldContext, filename, callback) => {
  str = str.trim()
  const words = str.split(' ')
  const command = words[0]
  if (command === 'look' || command === 'l') {
    const node = nodeIndex[id]
    const edges = edgeFromIndex[id] || []
    const exits = edges.map(edge => nodeIndex[edge.direction].name).join(', ')
    print(chalk.bold(node.name))
    if (node.notes) {
      print(node.notes)
    }
    print(`exits: ${exits}`)
  } else if (command === 'list') {
    const node = nodeIndex[id]
    const edges = edgeFromIndex[id]
    const contents = edges.map(edge => nodeIndex[edge._to].name).join(', ')
    print(chalk.bold(node.name))
    print(contents)
  } else if (command === 'go') {
    // dest can be adjacent edge or node name, or abs path
    const dest = words[1]

    id = 2
  }
  // const { output, context } = await evaluate(str, oldContext)
  // print(output)
  // oldContext.locationId = context.locationId
  // const location = await context.connection.get(context.locationId)
  // print(decorateLocation(location))
  callback() // so knows to print prompt again
}

const server = repl.start({ prompt, eval: step })
