// driver for orgmode text files

import fs from 'fs/promises' // node lib
// import libpath from 'path' // node lib
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
    this.initialPath = path
  }

  // crud operations

  async get(spec) {
    let key = spec
    if (key === 'initialPath') return this.initialPath
    const name = key //'' //.
    const type = name ? 'heading' : 'orgmode'
    const props = { _id: key, name, path: key, type }
    return new NodeOrgmode(this, props)
  }
  set() {}
  update() {}
  del() {}
}

//

class NodeOrgmode {
  constructor(datasource, props = {}) {
    this.datasource = datasource
    this.props = props
  }

  async load() {
    this.props.notes = String(await fs.readFile(this.datasource.path))
  }

  //. scan file for key = header name/text - then add indexes
  async getContents() {
    if (!this.props.notes) await this.load()
    const regex = /^[*]+[ ]+(.*)$/gm // match header lines
    const contents = []
    let arr
    while ((arr = regex.exec(this.props.notes)) !== null) {
      contents.push(arr[1])
    }
    return contents
  }

  async getNotes() {
    if (!this.props.notes) await this.load()
    return this.props.notes
  }

  // crud operations

  async get(spec) {
    const map = {
      contents: this.getContents,
      notes: this.getNotes,
    }
    return libdrivers.get(this, spec, map)
  }
}
