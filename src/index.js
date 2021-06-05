import repl from 'repl' // node lib - lots of options https://nodejs.org/api/repl.html

const print = console.log
const welcome = `
Welcome to Neomem
-----------------------------------------------------`
const prompt = '=> '

print(welcome)

let data = {
  nodes: [
    { _id: 1, name: 'forest' },
    { _id: 2, name: 'clearing' },
  ],
  edges: [{ _from: 1, _to: 2, name: 'east' }],
}

let id = 1

let nodeIndex = {}
data.nodes.forEach(node => (nodeIndex[node._id] = node))
let edgeFromIndex = {}
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
  if (str === 'look' || str === 'l') {
    let node = nodeIndex[id]
    let edges = edgeFromIndex[id]
    let exits = edges.map(edge => edge.name)
    print(node)
    print(exits)
  }
  // const { output, context } = await evaluate(str, oldContext)
  // print(output)
  // oldContext.locationId = context.locationId
  // const location = await context.connection.get(context.locationId)
  // print(decorateLocation(location))
  callback() // so knows to print prompt again
}

const server = repl.start({ prompt, eval: step })
