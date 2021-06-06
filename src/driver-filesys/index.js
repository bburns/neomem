import pathlib from 'path'
import * as lib from './lib.js'
import { driver as driverJson } from '../driver-json/index.js'

export const driver = {
  connect() {
    return new Connect()
  },
}

//

class Connect {
  constructor() {}

  // crud operations

  async get(key) {
    key = pathlib.normalize(key)
    const name = pathlib.basename(key)
    return new Node(this, { _id: key, name })
  }

  set() {}
  update() {}
  del() {}
}

//

class Node {
  constructor(connection, props) {
    this.connection = connection
    this.props = props
  }

  // load(path) {
  //   driverJson.
  // }

  async getType() {
    const path = this.getPath()
    const type = (await lib.isDir(path))
      ? { _id: 'm1', name: 'folder' }
      : { _id: 'm2', name: 'file' }
    return new Node(this.connection, type)
  }

  // getPath(node) {
  //   //. walk up tree to get path? until root or mount point? i guess so
  //   // return this.path
  //   // return '.'
  //   let path = pathlib.normalize(node._id)
  //   return path
  // }
  getPath() {
    const path = pathlib.normalize(this.props._id)
    return path
  }

  // diff drivers implement these differently - polymorphic
  async getContents() {
    const type = await this.getType()
    const typeName = await type.get('name')
    const path = this.getPath()
    if (typeName === 'folder') {
      return lib.readDir(path)
    }
    return '(n/a)'
  }

  getEdges() {
    const edges = this.connection.edgeFromIndex[this.props._id] || []
    return edges
  }

  getExits() {
    // const edges = this.getEdges(node)
    // const exits = edges
    //   .map(edge => this.nodeIndex[edge.type || this.unlabelled].name)
    //   .join(', ')
    // return exits
    return '(n/a)'
  }

  async getNotes() {
    const type = await this.getType()
    const typeName = await type.get('name')
    const path = this.getPath()
    if (typeName === 'file') {
      return lib.readFile(path, 80)
    }
    return '(n/a)'
  }

  async get(prop) {
    if (prop === 'name') {
      return this.props[prop]
    } else if (prop === 'type') {
      return this.getType()
    } else if (prop === 'notes') {
      return this.getNotes()
    } else if (prop === 'exits') {
      return this.getExits()
    } else if (prop === 'contents') {
      return this.getContents()
    }
  }
}
