// driver for json timegraph files
// have meta, nodes, edges, history subitems

import fs from 'fs/promises'
import pathlib from 'path'

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
    this.nodeNameIndex = {}
  }

  async load(path) {
    // read all json data
    const data = JSON.parse(String(await fs.readFile(path)))
    // read metadata
    const folder = pathlib.dirname(path)
    const metafilepath = pathlib.join(folder, data.meta.metafile)
    const meta = JSON.parse(String(await fs.readFile(metafilepath)))
    // get node index
    data.nodes.forEach(node => (this.nodeIndex[node._id] = node))
    //. assume unique names for now
    data.nodes.forEach(node => (this.nodeNameIndex[node.name] = node))
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

  // crud operations

  async get(key) {
    const props = this.nodeIndex[key] || this.nodeNameIndex[key]
    return new Node(this, props)
  }

  set() {}
  update() {}
  del() {}
}

//

class Node {
  constructor(connection, props = {}) {
    this.connection = connection
    this.props = props
  }

  getType() {
    const type = this.connection.nodeIndex[this.props.type]
    return new Node(this.connection, type)
  }

  getEdges() {
    //. need Edge class also?
    const edges = this.connection.edgeFromIndex[this.props._id] || []
    return edges
  }

  getContents() {
    const edges = this.getEdges()
    const contents = edges.map(edge => this.connection.nodeIndex[edge._to].name)
    return contents
  }

  getExits() {
    const edges = this.getEdges()
    const exits = edges.map(edge => this.connection.nodeIndex[edge.type].name)
    return exits
  }

  // some props are simple keyvalue items, some are relnships, etc
  async get(prop) {
    if (prop === 'name') {
      return this.props[prop]
    } else if (prop === 'type') {
      return this.getType()
    } else if (prop === 'notes') {
      return this.props[prop]
    } else if (prop === 'contents') {
      return this.getContents()
    } else if (prop === 'exits') {
      return this.getExits()
    }
    return this.props[prop]
  }
}
