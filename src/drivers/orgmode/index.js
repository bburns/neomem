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

  async load(path) {
    this.path = path
    //. read whole file
    this.text = String(await fs.readFile(path))
  }

  getInitialLocation() {
    return this.initialLocation
  }

  async get(key) {
    //. scan file for key = header name/text - eventually could have indexes?
    //. returns this.text ?
    const props = { _id: key, name: this.path, notes: this.text }
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

  getContents() {
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
