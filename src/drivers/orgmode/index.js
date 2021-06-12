// driver for orgmode text files

import fs from 'fs/promises'
import * as libdrivers from '../libdrivers.js'

export const driver = {
  connect() {
    return new Connection()
  },
}

//

class Connection {
  constructor() {
    this.type = 'orgmode'
    this.path = null
    this.initialLocation = null
    this.text = null
  }

  // async load(path) {
  //   this.path = path
  //   //. read whole file - better to do lazily in Node class
  //   this.text = String(await fs.readFile(path))
  // }

  getInitialLocation() {
    return this.initialLocation
  }

  async get(key) {
    const props = {
      _id: key,
      name: key,
      // notes: this.text,
      path: key,
    }
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

  //. scan file for key = header name/text - eventually could have indexes?
  async load() {
    this.props.notes = String(await fs.readFile(this.props.path))
  }

  async getContents() {
    if (!this.props.notes) await this.load()
    const regex = /^[*]+[ ]+.*$/gm // match header lines
    const contents = []
    let arr
    while ((arr = regex.exec(this.props.notes)) !== null) {
      contents.push(arr[0])
    }
    return contents
  }

  // getNotes() {
  //   return this.props.notes
  // }

  getType() {
    const type = { _id: 'orgmode', name: 'orgmode' }
    return new Node(this.connection, type)
  }

  async get(spec) {
    const map = {
      contents: this.getContents,
      // notes: this.getNotes,
      type: this.getType,
    }
    return libdrivers.get(this, spec, map)
  }
}
