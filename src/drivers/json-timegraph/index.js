// driver for json timegraph files
// have meta, nodes, edges, history subitems

import fs from 'fs/promises'
import pathlib from 'path'
import * as libdrivers from '../libdrivers.js'

export const driver = {
  connect(path) {
    return new Connection(path)
  },
}

//

class Connection {
  constructor(path) {
    this.type = 'json-timegraph'
    // this.path = null
    this.path = path
    this.index = null
    this.initialLocation = null
  }

  //. move this to Node - should load lazily as needed
  async load() {
    // this.path = path

    // read all json data
    // const data = JSON.parse(String(await fs.readFile(path)))
    const data = eval(String(await fs.readFile(this.path)))
    this.initialLocation = data.meta.initialLocation

    // read metadata
    const folder = pathlib.dirname(this.path)
    const metafilepath = pathlib.join(folder, data.meta.metafile)
    // const meta = JSON.parse(String(await fs.readFile(metafilepath)))
    const meta = eval(String(await fs.readFile(metafilepath)))

    this.index = {
      nodeId: {},
      nodeName: {},
      edgeFrom: {},
      edgeTo: {},
    }

    // get node index
    data.nodes.forEach(node => (this.index.nodeId[node._id] = node))
    //. add metadata nodes - ok?
    meta.nodes.forEach(node => (this.index.nodeId[node._id] = node))

    //. assume unique names for now
    data.nodes.forEach(node => (this.index.nodeName[node.name] = node))

    // get edge indexes
    data.edges.forEach(edge => {
      if (this.index.edgeFrom[edge._from]) {
        this.index.edgeFrom[edge._from].push(edge)
      } else {
        this.index.edgeFrom[edge._from] = [edge]
      }
      // if (this.index.edgeTo[edge._to]) {
      //   this.index.edgeTo[edge._to].push(edge)
      // } else {
      //   this.index.edgeTo[edge._to] = [edge]
      // }
    })
    //. add metadata edges also?
  }

  async getInitialLocation() {
    if (!this.index) await this.load()
    return this.initialLocation
  }

  // crud operations

  async get(key) {
    if (!this.index) await this.load()
    const props = this.index.nodeId[key] || this.index.nodeName[key]
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
    const edges = this.getEdges()
    const contents = edges
      .map(edge => this.connection.index.nodeId[edge._to].name)
      .sort((a, b) => a.localeCompare(b))
    return contents
  }

  getEdges() {
    //. need Edge class also?
    const edges = this.connection.index.edgeFrom[this.props._id] || []
    return edges
  }

  getExits() {
    const edges = this.getEdges()
    const exits = edges
      .map(edge => edge.direction)
      .filter(dir => dir !== 'contains')
      .sort((a, b) => a.localeCompare(b))
    return [...new Set(exits)]
  }

  // getType() {
  //   const type = this.connection.index.nodeId[this.props.type]
  //   return new Node(this.connection, type)
  // }

  // some props are simple keyvalue items, some are relnships, etc
  async get(spec) {
    const map = {
      contents: this.getContents,
      exits: this.getExits,
      // type: this.getType,
    }
    return libdrivers.get(this, spec, map)
  }
}
