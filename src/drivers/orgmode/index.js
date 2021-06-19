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
    const nodes = []

    // scan file for headers
    const text = this.text
    const type = 'header'
    const regex = /^([*]+[ ]+)(.*)$/gm

    // make a match obj for top of file - first line will be the name
    let match = { index: 0, 1: '', 2: text.slice(0, text.indexOf('\n')) }

    // let lastPos = 0
    // let lastHeaderLength = 0
    do {
      const pos = match.index // start of header

      // // assign props to previous node retroactively
      // if (nodes.length > 0) {
      //   const lastLength = pos - lastPos
      //   const lastNodeProps = nodes[nodes.length - 1].props
      //   lastNodeProps.length = lastLength
      //   lastNodeProps.notes = text.slice(lastPos + lastHeaderLength, pos)
      //   lastPos = pos
      //   lastHeaderLength = match[1].length + match[2].length
      // }

      const length = null // will be set
      const notes = null
      const key = pos
      const indent = match[1].trim() // header asterisks
      const depth = indent.length
      const name = match[2].trim() // header text
      const notesStart = pos + match[1].length + match[2].length + 1

      //. scan text for "prop: value" lines, add to node props
      // i guess for the read view, would just use notes to edit them,
      // but for table view would want to access them as props.
      const propvalues = {}

      const props = {
        key,
        name,
        type,
        depth,
        indent,
        length,
        notes,
        notesStart,
        ...propvalues,
      }
      const node = new NodeOrgmode(this, props)
      nodes.push(node)

      //.. also want to store graph structure, in this case a tree -
      // have a edges 'table'

      // @ts-ignore
    } while ((match = regex.exec(text)) !== null)

    let first = true
    let lastNode = null
    for (const node of nodes) {
      if (lastNode) {
        lastNode.props.notesEnd = node.props.key
      }
      lastNode = node
    }

    for (const node of nodes) {
      node.props.notes = text.slice(node.props.notesStart, node.props.notesEnd)
    }

    // // update last node
    // const lastNodeProps = nodes[nodes.length - 1].props
    // const pos = text.length
    // lastNodeProps.length = pos - lastPos
    // lastNodeProps.notes = text.slice(lastPos, pos)

    // update indexes
    this.indexes.keys = {}
    for (const node of nodes) {
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
