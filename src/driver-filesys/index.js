import fs from 'fs/promises'
import pathlib from 'path'
import { meta } from './meta.js'

export const driver = {
  connect() {
    return new Connect()
  },
}

async function isDir(path) {
  try {
    const stat = await fs.stat(path)
    return stat.isDirectory()
  } catch (e) {
    // stat throws an error if path doesn't exist
    return false
  }
}

async function readDir(path) {
  return await fs.readdir(path)
}

async function readFile(path, nchars) {
  const h = await fs.open(path, 'r')
  const { buffer } = await h.read(Buffer.alloc(nchars), 0, nchars, 0)
  await h.close()
  return String(buffer)
}

class Connect {
  constructor() {}

  // async load(path) {
  //   this.path = path
  // }

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

class Node {
  constructor(props, connection) {
    this.props = props
    this.connection = connection
  }

  async getType() {
    const path = this.getPath()
    const type = (await isDir(path))
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
      return readDir(path)
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
      return readFile(path, 80)
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
