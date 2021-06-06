// driver for json timegraph files
// have meta, nodes, edges, history subitems

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
    // this.nodeNameIndex = {}
    // this.unlabelled = 'm4'
  }

  async load(path) {
    // read all json data
    const data = JSON.parse(String(await fs.readFileSync(path)))
    // get node index
    data.nodes.forEach(node => (this.nodeIndex[node._id] = node))
    // data.nodes.forEach(node => (this.nodeNameIndex[node.name] = node))
    // get edge indexes
    data.edges.forEach(edge => {
      if (this.edgeFromIndex[edge._from]) {
        this.edgeFromIndex[edge._from].push(edge)
      } else {
        this.edgeFromIndex[edge._from] = [edge]
      }
      // if (this.edgeToIndex[edge._to]) {
      //   this.edgeToIndex[edge._to].push(edge)
      // } else {
      //   this.edgeToIndex[edge._to] = [edge]
      // }
    })
    //. get edgeToIndex
    //. get name indexes
  }

  //. these will all be part of 'get'

  // crud operations

  async get(key) {
    // key = pathlib.normalize(key)
    // const name = pathlib.basename(key)
    // return new Node({ _id: key }, this)
    const props = this.nodeIndex[key]
    return new Node(props, this)
  }

  set() {}
  update() {}
  del() {}
}

//

class Node {
  constructor(props, connection) {
    this.props = props
    this.connection = connection
  }
  // getNode(id) {
  //   const node = this.nodeIndex[id]
  //   return node
  // }
  // getType(node) {
  //   const type = this.nodeIndex[node.type]
  //   return type
  // }
  // getEdges(node) {
  //   const edges = this.edgeFromIndex[node._id] || []
  //   return edges
  // }
  // getContents(node) {
  //   const edges = this.getEdges(node)
  //   const contents = edges.map(edge => this.nodeIndex[edge._to].name).join(', ')
  //   return contents
  // }
  // getExits(node) {
  //   const edges = this.getEdges(node)
  //   const exits = edges
  //     .map(edge => this.nodeIndex[edge.type || this.unlabelled].name)
  //     .join(', ')
  //   return exits
  // }
  get(prop) {
    if (prop === 'name') {
      return this.props[prop]
      // } else if (prop === 'type') {
      // return this.getType()
      // } else if (prop === 'notes') {
      // return this.getNotes()
      // } else if (prop === 'contents') {
      // return this.getContents()
    }
  }
}
