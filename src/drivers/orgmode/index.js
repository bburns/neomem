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
    this.initialPath = 0
    this.indexes = {} //.
    this.text = null
    this.dirty = true
  }

  // load file and scan for headers, add to indexes
  async load() {
    // load file
    this.text = String(await fs.readFile(this.path))
    const subnodes = []
    // make node for top of file
    let match = { 1: '', 2: '', index: 0, type: 'orgmode' } //.
    // scan file for headers
    const regex = /^([*]+)[ ]+(.*)$/gm // match header lines
    const type = 'header'
    do {
      const nchar = match.index
      const length = 100 //.
      const key = nchar
      const indent = match[1]
      const depth = match[1].length
      const header = match[2]
      const notes = this.text.slice(nchar, nchar + length)
      const props = { key, name: header, depth, indent, type, length, notes }
      const node = new NodeOrgmode(this, props)
      subnodes.push(node)
      // @ts-ignore
    } while ((match = regex.exec(this.text)) !== null)
    // update indexes
    this.indexes.keys = {}
    for (const node of subnodes) {
      this.indexes.keys[node.props.key] = node
    }
    this.dirty = false
  }

  // crud operations

  async get(spec) {
    if (this.dirty) await this.load()
    let key = spec
    if (key === 'initialPath') return this.initialPath
    const node = this.indexes.keys[key]
    return node
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

  getContents() {
    //. i guess this should return the nodes - called could do
    // whatever they want with them
    const contents = Object.values(this.datasource.indexes.keys).map(
      // node => node.props.name
      node => node.props.key
    )
    return contents
  }

  // crud operations

  async get(spec) {
    const map = {
      contents: this.getContents,
    }
    return libdrivers.get(this, spec, map)
  }
}
