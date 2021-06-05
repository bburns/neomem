import fs from 'fs/promises'
import pathlib from 'path'
import meta from './meta-filesys.js'

export const driver = {
  connect() {
    return new Connect()
  },
}

async function isDir(path) {
  try {
    // var stat = fs.lstatSync(path)
    const stat = await fs.stat(path)
    return stat.isDirectory()
  } catch (e) {
    // stat throws an error if path doesn't exist
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
  async getType(node) {
    // const type = this.nodeIndex[node.type]
    const path = this.getPath(node)
    const type = (await isDir(path))
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

  async readDir(path) {
    // return fs.readdirSync(path)
    return await fs.readdir(path)
  }

  async readFile(path, nchars) {
    // return fs.readFileSync(path)
    // const fd = fs.openSync(path, 'r')
    // fs.read(fd, Buffer.alloc(200), 0, 100, 0, (err, bytesRead, buffer) => {
    //   console.log(err, bytesRead, buffer)
    //   fs.closeSync(fd)
    //   return String(buffer)
    // })
    const h = await fs.open(path, 'r')
    const { bytesRead, buffer } = await h.read(Buffer.alloc(200), 0, 200, 0)
    await h.close()
    return String(buffer)
  }

  // diff drivers implement these differently - polymorphic
  async getContents(node) {
    const type = await this.getType(node)
    const path = this.getPath(node)
    if (type.name === 'folder') {
      return await this.readDir(path)
    } else if (type.name === 'file') {
      return await this.readFile(path, 200)
    }
  }

  get() {}
  set() {}
  update() {}
  del() {}
}
