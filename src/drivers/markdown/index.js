// driver for markdown text files

import fs from 'fs/promises'

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
    this.text = String(await fs.readFile(path))
  }

  getInitialLocation() {
    return this.initialLocation
  }

  async get(key) {
    //. scan file for key = header name/text - eventually could have indexes
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
    const regex = /^[#]+[ ]+.*$/gm // match header lines
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
    const type = { _id: 'markdown', name: 'markdown' }
    return new Node(this.connection, type)
  }

  // some props are simple keyvalue items, some are relnships, etc
  async get(prop) {
    const map = {
      contents: this.getContents,
      // notes: this.getNotes,
      type: this.getType,
    }
    const method = map[prop]
    return method ? method.bind(this)() : this.props[prop]
  }
}
