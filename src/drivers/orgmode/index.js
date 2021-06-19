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

    // scan file for headers
    const text = this.text
    const type = 'header'
    const regex = /^([*]+)[ ]+(.*)$/gm
    // match obj for top of file
    let match = { 1: '', 2: text.slice(0, text.indexOf('\n')), index: 0 }
    let lastPos = 0
    do {
      const pos = match.index
      const lastLength = pos - lastPos
      // assign props to previous node retroactively
      if (subnodes.length > 0) {
        const lastSubnodeProps = subnodes[subnodes.length - 1].props
        lastSubnodeProps.length = lastLength
        lastSubnodeProps.notes = text.slice(lastPos, pos)
        lastPos = pos
      }
      const length = null
      const notes = null
      const key = pos
      const indent = match[1] // header asterisks //. return spaces
      const depth = indent.length
      const name = match[2].trim() // header text
      //.. scan text for "prop: value" lines, add to node props
      const propvalues = {}

      const props = {
        key,
        name,
        type,
        depth,
        indent,
        length,
        notes,
        contents: [], //.
        ...propvalues,
      }
      const node = new NodeOrgmode(this, props)
      subnodes.push(node)

      //.. also want to store graph structure, in this case a tree -
      // have a edges 'table'

      // @ts-ignore
    } while ((match = regex.exec(text)) !== null)

    // //... add final subnode
    // const props = { name: 'ahhhh eof' }
    // const subnode = new NodeOrgmode(this, props)
    // subnodes.push(subnode)

    //. update last node
    const lastSubnodeProps = subnodes[subnodes.length - 1].props
    const pos = text.length
    lastSubnodeProps.length = pos - lastPos
    lastSubnodeProps.notes = text.slice(lastPos, pos)

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
