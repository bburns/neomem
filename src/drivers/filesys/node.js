// filesystem node - file or folder

import pathlib from 'path'
import * as lib from './lib.js'

export class Node {
  constructor(connection, props) {
    this.connection = connection
    this.props = props
  }

  async getContents() {
    const type = await this.getType()
    const typeName = await type.get('name')
    const path = this.getPath()
    if (typeName === 'folder') {
      return lib.readDir(path)
    }
    // files don't have contents - they have notes - see getNotes
    return ['(n/a)']
  }

  async getExits() {
    return ['up']
  }

  async getNotes() {
    const type = await this.getType()
    const typeName = await type.get('name')
    const path = this.getPath()
    if (typeName === 'file') {
      return lib.readFile(path, 60)
    }
    // folders don't have notes - they have contents - see getContents
    return '(n/a)'
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

  async getType() {
    const path = this.getPath()
    //. use filesys-meta.json values here
    // const type = await lib.isDir(path)
    //   ? { _id: 'folder', name: 'folder' }
    //   : { _id: 'file', name: 'file' }
    // return new Node(this.connection, type)
    const isFolder = await lib.isDir(path)
    let type
    if (isFolder) {
      //. use filesys-meta.json values here
      type = { _id: 'folder', name: 'folder' }
    } else if (path.endsWith('.md')) {
      //... fix this
      // ie want automatic mount for certain file types/extensions
      type = { _id: 'mount', name: 'mount' }
    } else {
      type = { _id: 'file', name: 'file' }
    }
    return new Node(this.connection, type)
  }

  async get(prop) {
    const map = {
      contents: this.getContents,
      exits: this.getExits,
      notes: this.getNotes,
      type: this.getType,
    }
    const method = map[prop]
    return method ? method.bind(this)() : this.props[prop]
  }
}
