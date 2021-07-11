// driver for js/json timegraph files
// have meta, nodes, edges, history subitems

// this is kind of a proving ground for the postgres-timegraph driver.

import fs from 'fs/promises' // node lib - filesystem
import pathlib from 'path' // node lib - path handling
import * as libdrivers from '../libdrivers.js'

export const driver = {
  connect(path) {
    return new DatasourceJsonTimegraph(path)
  },
}

//

class DatasourceJsonTimegraph {
  constructor(path) {
    this.type = 'json-timegraph'
    this.path = path
    this.index = null // dict of indexes
    this.initialPath = null
  }

  // read file and build indexes
  //. don't strictly need this - could scan file each request for now
  async load() {
    // read all json data
    const data = eval(String(await fs.readFile(this.path)))
    this.initialPath = data.meta.initialPath

    //. create Node objects
    //. we read in json data, so these are props objects, NOT nodes - confusing
    const nodes = data.nodes.map(props => new NodeJsonTimegraph(this, props))

    // read metadata
    // kept in a separate file so can be shared across datasources
    const folder = pathlib.dirname(this.path)
    const metafilepath = pathlib.join(folder, data.meta.metafile)
    const meta = eval(String(await fs.readFile(metafilepath)))

    this.index = {
      nodeId: {},
      nodeName: {},
      edgeFrom: {},
      edgeTo: {},
    }

    // get node index
    // data.nodes.forEach(node => (this.index.nodeId[node._id] = node))
    nodes.forEach(node => (this.index.nodeId[node.props._id] = node))

    //. add metadata nodes - ok?
    //. these are props not Nodes
    meta.nodes.forEach(node => (this.index.nodeId[node._id] = node))

    //. assume unique names for now
    // data.nodes.forEach(node => (this.index.nodeName[node.name] = node))
    nodes.forEach(node => (this.index.nodeName[node.props.name] = node))

    // get edge indexes
    data.edges.forEach(edge => {
      if (this.index.edgeFrom[edge._from]) {
        this.index.edgeFrom[edge._from].push(edge)
      } else {
        this.index.edgeFrom[edge._from] = [edge]
      }
      //.
      // if (this.index.edgeTo[edge._to]) {
      //   this.index.edgeTo[edge._to].push(edge)
      // } else {
      //   this.index.edgeTo[edge._to] = [edge]
      // }
    })
    //. add metadata edges also?
  }

  // crud operations

  //. spec could be a name, key, path, array of such, qbe, etc
  async get(spec) {
    const key = spec
    if (!this.index) await this.load()
    if (key === 'initialPath') return this.initialPath
    const node = this.index.nodeId[key] || this.index.nodeName[key]
    return node
  }

  set() {}
  update() {}
  del() {}
}

//

class NodeJsonTimegraph {
  constructor(datasource, props = {}) {
    this.datasource = datasource
    this.props = props
  }

  // get array of NodeJsonTimegraph objects
  //. assuming user wants the whole thing in an array, for now
  //. yield nodes? ie make this a generator?
  *getContents() {
    const edges = this.getEdges()
    const contents = edges.map(edge => this.datasource.index.nodeId[edge._to])
    // return contents
    for (let node of contents) {
      yield node
    }
  }

  getEdges() {
    //. need Edge class also?
    const edges = this.datasource.index.edgeFrom[this.props._id] || []
    return edges
  }

  getExits() {
    const edges = this.getEdges()
    const exits = edges
      .map(edge => edge.direction)
      .filter(dir => dir !== 'contains')
      .sort()
    return [...new Set(exits)]
  }

  getSize() {
    return libdrivers.sizeOf(this)
  }

  // crud operations

  // some props are simple keyvalue items, some are relnships, etc
  //. spec could be a name, key, path, array of such, qbe, etc
  async get(spec) {
    const accessorMap = {
      contents: this.getContents,
      exits: this.getExits,
      size: this.getSize,
    }
    return libdrivers.get(this, spec, accessorMap)
  }
}
