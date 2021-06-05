import repl from 'repl' // node lib - lots of options https://nodejs.org/api/repl.html
import chalk from 'chalk' // color text https://github.com/chalk/chalk
import { data } from './data.js'

const print = console.log
const welcome = `
Welcome to Neomem
-----------------------------------------------------`
const prompt = '=> '

print(welcome)

// locations
let id = 1
const unlabelled = 3

// get indexes
const nodeIndex = {}
data.nodes.forEach(node => (nodeIndex[node._id] = node))
const edgeFromIndex = {}
data.edges.forEach(edge => {
  if (edgeFromIndex[edge._from]) {
    edgeFromIndex[edge._from].push(edge)
  } else {
    edgeFromIndex[edge._from] = [edge]
  }
})

// diff drivers implement these differently - polymorphic
function getContents(node) {
  // if node is file, read first 200 chars
  // if node is folder, get list of files
  // if node is place, get list of nodes linked from here
  const typeName = nodeIndex[node.type].name
  if (typeName === 'file') {
    // return fs.readFileSync(getPath(node))
    return node.contents
  } else if (typeName === 'folder') {
    // return fs.readdirSync(getPath(node))
    // return
  }
}

// parse command string
// note: these parameters are specified by node's repl library.
const step = async (str, oldContext, filename, callback) => {
  str = str.trim()
  const words = str.split(' ')
  const command = words[0]
  //
  if (command === 'look' || command === 'l') {
    const node = nodeIndex[id]
    // const type = nodeIndex[node.type]
    // const contentType = nodeIndex[type.contentType]
    const edges = edgeFromIndex[id] || []
    const exits = edges
      .map(edge => nodeIndex[edge.type || unlabelled].name)
      .join(', ')
    print(chalk.bold(node.name))
    if (node.notes) {
      print(`notes: ${node.notes}`)
    }
    // const contents = contentType.name
    // if (contentType.name === 'readDir') {
    // }
    const contents = getContents(node)
    const entrances = []
    print(`contents: ${contents}`)
    print(`exits: ${exits}`)
    print(`entrances: ${entrances}`)
    //
  } else if (command === 'list') {
    const node = nodeIndex[id]
    const edges = edgeFromIndex[id] || [] // eg [{_from:1, _to:2}]
    // const edgeNames = edges.map(edge => )
    const contents = edges.map(edge => nodeIndex[edge._to].name).join(', ')
    print(chalk.bold(node.name))
    print(`contents: ${contents}`)
    //
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
