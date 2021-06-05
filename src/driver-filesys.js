import fs from 'fs'

export const driver = {
  connect() {
    return new Connect()
  },
}

class Connect {
  constructor() {
    this.nodeIndex = {}
    this.edgeFromIndex = {}
    this.edgeToIndex = {}
    this.unlabelled = 'm4'
  }
  // async load(path) {
  //   // read data
  //   const data = JSON.parse(String(await fs.readFileSync(path)))
  //   // get node index
  //   data.nodes.forEach(node => (this.nodeIndex[node._id] = node))
  //   // get edge indexes
  //   data.edges.forEach(edge => {
  //     if (this.edgeFromIndex[edge._from]) {
  //       this.edgeFromIndex[edge._from].push(edge)
  //     } else {
  //       this.edgeFromIndex[edge._from] = [edge]
  //     }
  //   })
  // }
  //. these will be part of 'get'
  getNode(id) {
    const node = this.nodeIndex[id]
    return node
  }
  getType(node) {
    const type = this.nodeIndex[node.type]
    return type
  }
  getEdges(node) {
    const edges = this.edgeFromIndex[node._id] || []
    return edges
  }
  getExits(node) {
    const edges = this.getEdges(node)
    const exits = edges
      .map(edge => this.nodeIndex[edge.type || this.unlabelled].name)
      .join(', ')
    return exits
  }

  readDir(path) {
    // return fs.readdirSync(path)
    return 'a dir list'
  }

  readFile(path, nchars) {
    // return fs.readFileSync(path)
    return 'blahblah'
  }
  getPath(node) {
    //. walk up tree to get path? until mount point? i guess so
    return 'a path'
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
    const readCommand = type.readCommand
    // if node is folder, get list of files
    if (readCommand === 'readDir') {
      return this.readDir(path)
      // if node is file, read first 200 chars
    } else if (readCommand === 'readFile') {
      return this.readFile(path, 200)
    }
    // return node.contents
  }
  get() {}
  set() {}
  update() {}
  del() {}
}
