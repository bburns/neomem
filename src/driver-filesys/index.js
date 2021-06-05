import pathlib from 'path'
import * as lib from './lib.js'
// import { meta } from './meta.js'

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
    return new Node({ _id: key, name }, this)
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

  async getType() {
    const path = this.getPath()
    const type = (await lib.isDir(path))
      ? { _id: 'm1', name: 'folder' }
      : { _id: 'm2', name: 'file' }
    return new Node(type, this.connection)
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

  // getEdges(node) {
  //   // const edges = this.edgeFromIndex[node._id] || []
  //   // return edges
  // }

  // getExits(node) {
  //   // const edges = this.getEdges(node)
  //   // const exits = edges
  //   //   .map(edge => this.nodeIndex[edge.type || this.unlabelled].name)
  //   //   .join(', ')
  //   // return exits
  //   return '(n/a)'
  // }

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
    } else if (prop === 'contents') {
      return this.getContents()
    }
  }
}
