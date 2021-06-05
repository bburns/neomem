import fs from 'fs'
import repl from 'repl' // node lib - lots of options https://nodejs.org/api/repl.html
import chalk from 'chalk' // color text https://github.com/chalk/chalk
// import { data } from './data-neomem.js'
import { data } from './data-filesys.js'

const print = console.log
const welcome = `
Welcome to Neomem
-----------------------------------------------------`
const prompt = '=> '

print(welcome)

// locations
let id = 1
const unlabelled = 'm4'

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

function getPath(node) {
  //. walk up tree to get path? until mount point? i guess so
  return 'a path'
}

function readDir(path) {
  // return fs.readdirSync(path)
  return 'a dir list'
}

function readFile(path) {
  // return fs.readFileSync(path)
  return 'blahblah'
}

// diff drivers implement these differently - polymorphic
function getContents(node) {
  const type = nodeIndex[node.type]
  const readCommand = type.readCommand
  // if node is folder, get list of files
  if (readCommand === 'readDir') {
    // return 'run readdir'
    return readDir(getPath(node))
    // if node is file, read first 200 chars
  } else if (readCommand === 'readFile') {
    return readFile(getPath(node))
  }
  // return node.contents
}

function getExits(node) {
  const edges = edgeFromIndex[node._id] || []
  const exits = edges
    .map(edge => nodeIndex[edge.type || unlabelled].name)
    .join(', ')
  return exits
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
    const type = nodeIndex[node.type]

    print(chalk.bold(node.name))
    print(`type: ${type.name}`)
    print(`notes: ${node.notes}`)
    print(`contents: ${getContents(node)}`)
    print(`exits: ${getExits(node)}`)
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
    // dest can be adjacent edge name, node name, or abs path, or id
    // eg 'go north', 'go /home', 'go hello.txt', '2' ?
    const dest = words[1]
    id = Number(dest)
  }
  // const { output, context } = await evaluate(str, oldContext)
  // print(output)
  // oldContext.locationId = context.locationId
  // const location = await context.connection.get(context.locationId)
  // print(decorateLocation(location))
  print()
  callback() // so knows to print prompt again
}

const server = repl.start({ prompt, eval: step })
