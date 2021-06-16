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
    this.index = {} //.
    this.text = null
    this.dirty = true
  }

  // load file and scan for headers, add to indexes
  async load() {
    // load file
    this.text = String(await fs.readFile(this.path))
    // add node for front matter
    const node = { key: 0, name: '', type: 'orgmode' }
    const subnodes = [node]
    // scan file for headers
    const regex = /^([*]+)[ ]+(.*)$/gm // match header lines
    const type = 'header'
    let arr
    while ((arr = regex.exec(this.text)) !== null) {
      const nchar = 1 //.
      const length = 100 //.
      const key = nchar
      const indent = arr[1]
      const depth = arr[1].length
      const header = arr[2]
      const text = 'pokpok' //. this.text.slice(nchar, nchar + length)
      const node = { key, name: header, depth, indent, type, length, text }
      subnodes.push(node)
    }
    // update indexes
    this.index.keys = {}
    for (const node of subnodes) {
      this.index.keys[node.key] = node
    }
    this.subnodes = subnodes
    this.dirty = false
  }

  // crud operations

  async get(spec) {
    if (this.dirty) await this.load()
    let key = spec
    if (key === 'initialPath') return this.initialPath
    // const props = { _id: key, name, path: key, type } //.
    const props = this.index.keys[key]
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

  async getNotes() {
    return this.props.notes
  }

  // crud operations

  async get(spec) {
    const map = {
      // contents: this.getContents,
      notes: this.getNotes,
    }
    return libdrivers.get(this, spec, map)
  }
}
