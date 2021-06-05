import fs from 'fs'
import pathlib from 'path'
import meta from './meta-filesys.js'

export const driver = {
  connect() {
    return new Connect()
  },
}

function isDir(path) {
  try {
    var stat = fs.lstatSync(path)
    return stat.isDirectory()
  } catch (e) {
    // lstatSync throws an error if path doesn't exist
    return false
  }
}

class Connect {
  constructor() {
    // this.nodeIndex = {}
    // this.edgeFromIndex = {}
    // this.edgeToIndex = {}
    // this.unlabelled = 'm4'
  }

  async load(path) {
    // read data
    // const data = JSON.parse(String(await fs.readFileSync(path)))
    // // get node index
    // data.nodes.forEach(node => (this.nodeIndex[node._id] = node))
    // // get edge indexes
    // data.edges.forEach(edge => {
    //   if (this.edgeFromIndex[edge._from]) {
    //     this.edgeFromIndex[edge._from].push(edge)
    //   } else {
    //     this.edgeFromIndex[edge._from] = [edge]
    //   }
    // })
    this.path = path
  }

  //. these will all be part of 'get'

  getNode(key) {
    //. read props of the file or folder here? or do lazy eval?
    key = pathlib.normalize(key)
    // const stats = fs.statSync(key)
    const name = pathlib.basename(key)
    return { _id: key, name }
  }
  getName(node) {
    return node.name
  }
  getNotes(node) {
    // return node.notes
    return '(n/a)'
  }
  getPath(node) {
    //. walk up tree to get path? until root or mount point? i guess so
    // return this.path
    // return '.'
    let parent = pathlib.normalize(node._id)
    return parent
  }
  getType(node) {
    // const type = this.nodeIndex[node.type]
    const path = this.getPath(node)
    const type = isDir(path)
      ? { _id: 'm1', name: 'folder' }
      : { _id: 'm2', name: 'file' }
    return type
  }
  getEdges(node) {
    // const edges = this.edgeFromIndex[node._id] || []
    // return edges
  }
  getExits(node) {
    // const edges = this.getEdges(node)
    // const exits = edges
    //   .map(edge => this.nodeIndex[edge.type || this.unlabelled].name)
    //   .join(', ')
    // return exits
    return '(n/a)'
  }

  readDir(path) {
    return fs.readdirSync(path)
  }

  readFile(path, nchars) {
    return fs.readFileSync(path)
  }

  // getContents(node) {
  //   const edges = this.getEdges(node)
  //   const contents = edges.map(edge => this.nodeIndex[edge._to].name).join(', ')
  //   return contents
  // }
  // diff drivers implement these differently - polymorphic
  getContents(node) {
    const type = this.getType(node)
    const path = this.getPath(node)
    if (type.name === 'folder') {
      return this.readDir(path)
    } else if (type.name === 'file') {
      return this.readFile(path)
    }
    // const readCommand = type.readCommand
    // // if node is folder, get list of files
    // if (readCommand === 'readDir') {
    //   return this.readDir(path)
    //   // if node is file, read first 200 chars
    // } else if (readCommand === 'readFile') {
    //   return this.readFile(path, 200)
    // }
    // return node.contents
  }
  get() {}
  set() {}
  update() {}
  del() {}
}
