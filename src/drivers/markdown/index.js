// driver for markdown text files

import fs from 'fs/promises'
import pathlib from 'path'

export const driver = {
  connect() {
    return new Connection()
  },
}

class Connection {
  constructor() {
    this.type = 'markdown'
    this.path = null
    this.initialLocation = null
    this.text = null
  }

  async load(path) {
    this.path = path
    this.text = JSON.parse(String(await fs.readFile(path)))
  }

  getInitialLocation() {
    return this.initialLocation
  }

  // crud operations

  async get(key) {
    //. scan file for key = header name/text - eventually could have indexes
    const props = { _id: key, notes: this.text.slice(0, 60) }
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

  // getContents() {
  //   const edges = this.getEdges()
  //   const contents = edges
  //     .map(edge => this.connection.index.nodeId[edge._to].name)
  //     .sort((a, b) => a.localeCompare(b))
  //   return contents
  // }

  // getEdges() {
  //   //. need Edge class also?
  //   const edges = this.connection.index.edgeFrom[this.props._id] || []
  //   return edges
  // }

  // getExits() {
  //   const edges = this.getEdges()
  //   const exits = edges
  //     .map(edge => edge.direction)
  //     .filter(edge => edge !== 'contains')
  //     .sort((a, b) => a.localeCompare(b))
  //   return [...new Set(exits)]
  // }

  // getType() {
  //   const type = this.connection.index.nodeId[this.props.type]
  //   return new Node(this.connection, type)
  // }

  // some props are simple keyvalue items, some are relnships, etc
  async get(prop) {
    const map = {
      // contents: this.getContents,
      // exits: this.getExits,
      // type: this.getType,
    }
    const method = map[prop]
    return method ? method.bind(this)() : this.props[prop]
  }
}
