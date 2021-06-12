// filesystem node - file or folder

import fs from 'fs/promises'
import pathlib from 'path'
import * as lib from './lib.js'
import * as libdrivers from '../libdrivers.js'

export class Node {
  constructor(connection, props) {
    this.connection = connection
    this.props = props
  }

  async getContents() {
    const type = await this.getType()
    const path = this.getPath()
    if (type === 'folder') {
      return lib.readDir(path)
    }
    // files don't have contents - they have notes - see getNotes
    return ['(n/a)']
  }

  async getExits() {
    return ['up']
  }

  //. will want some kind of paging, like [more]? how do?
  async getNotes() {
    const type = await this.getType()
    const path = this.getPath()
    if (type === 'file') {
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
    //. _id is just the filename? or should it be the path relative to mount point?
    //. or walk up the path tree to get the full string
    const path = pathlib.join(this.connection.path, this.props._id)
    return path
  }

  async getType() {
    const path = this.getPath()
    const isFolder = await lib.isDir(path)
    if (isFolder) {
      return 'folder'
    } else {
      // check for mounts
      for (const filetype of this.connection.filetypes) {
        if (path.endsWith('.' + filetype.extension)) {
          return 'mount'
        }
      }
    }
    return 'file'
  }

  async getSize() {
    const path = this.getPath()
    const stats = await fs.stat(path) //. store this in the node, with .dirty flag
    if (stats.isDirectory()) {
      return 0
    }
    return stats.size
  }

  async getCreated() {
    const path = this.getPath()
    const stats = await fs.stat(path) //. store this in the node, with .dirty flag
    return stats.birthtimeMs
  }

  async getModified() {
    const path = this.getPath()
    const stats = await fs.stat(path) //. store this in the node, with .dirty flag
    return stats.mtimeMs
  }

  async get(spec) {
    const map = {
      contents: this.getContents,
      exits: this.getExits,
      notes: this.getNotes,
      size: this.getSize,
      type: this.getType,
      created: this.getCreated,
      modified: this.getModified,
    }
    return libdrivers.get(this, spec, map)
  }
}
