// driver for orgmode text files

import fs from 'fs/promises'
import * as libdrivers from '../libdrivers.js'

export const driver = {
  connect(path) {
    return new DatasourceOrgmode(path)
  },
}

//

class DatasourceOrgmode {
  constructor(path) {
    this.type = 'orgmode'
    this.path = path
    this.initialLocation = path
    this.text = null
  }

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
    return new NodeOrgmode(this, props)
  }
  set() {}
  update() {}
  del() {}
}

//

class NodeOrgmode {
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
    return new NodeOrgmode(this.connection, type)
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
