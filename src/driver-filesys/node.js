import pathlib from 'path'
import * as lib from './lib.js'

export class Node {
  constructor(connection, props) {
    this.connection = connection
    this.props = props
  }

  async getType() {
    const path = this.getPath()
    //. use filesys-meta.json values
    const type = (await lib.isDir(path))
      ? { _id: 'folder', name: 'folder' }
      : { _id: 'file', name: 'file' }
    return new Node(this.connection, type)
  }

  // getPath(node) {
  //   //. walk up tree to get path? until root or mount point? i guess so
  //   // return this.path
  //   // return '.'
  //   let path = pathlib.normalize(node._id)
  //   return path
  // }
  //. get full path?
  getPath() {
    //. _id is just the filename? or should it store the path relative to mount point?
    // const path = pathlib.normalize(this.props._id)
    const path = pathlib.join(this.connection.path, this.props._id)
    return path
  }

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

  async getExits() {
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
      // console.log(path)
      console.log(this.connection)
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
    return this.props[prop]
  }
}
