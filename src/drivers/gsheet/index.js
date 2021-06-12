// driver for google sheets

// import fs from 'fs/promises'
// import pathlib from 'path'

export const driver = {
  connect() {
    return new Connection()
  },
}

class Connection {
  constructor() {
    this.type = 'gsheet'
    this.notes = 'Google Sheet connection'
    // this.path = null
    // this.index = null
    // this.initialLocation = null
  }

  async load(path) {
    this.path = path

    // this.index = {
    //   nodeId: {},
    //   nodeName: {},
    //   edgeFrom: {},
    //   edgeTo: {},
    // }

    // // get node index
    // data.nodes.forEach(node => (this.index.nodeId[node._id] = node))
    // //. add metadata nodes - ok?
    // meta.nodes.forEach(node => (this.index.nodeId[node._id] = node))

    // //. assume unique names for now
    // data.nodes.forEach(node => (this.index.nodeName[node.name] = node))

    // // get edge indexes
    // data.edges.forEach(edge => {
    //   if (this.index.edgeFrom[edge._from]) {
    //     this.index.edgeFrom[edge._from].push(edge)
    //   } else {
    //     this.index.edgeFrom[edge._from] = [edge]
    //   }
    //   // if (this.index.edgeTo[edge._to]) {
    //   //   this.index.edgeTo[edge._to].push(edge)
    //   // } else {
    //   //   this.index.edgeTo[edge._to] = [edge]
    //   // }
    // })
    // //. add metadata edges also?
  }

  // getInitialLocation() {
  //   return this.initialLocation
  // }

  // crud operations

  async get(key) {
    // const props = this.index.nodeId[key] || this.index.nodeName[key]
    // return new Node(this, props)
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

  // getContents() {
  //   const edges = this.getEdges()
  //   const contents = edges
  //     .map(edge => this.connection.index.nodeId[edge._to].name)
  //     .sort((a, b) => a.localeCompare(b))
  //   return contents
  // }

  // getEdges() {
  //   //. need Edge class also?
  //   const edges = this.connection.index.edgeFrom[this.props._id] || []
  //   return edges
  // }

  // getExits() {
  //   const edges = this.getEdges()
  //   const exits = edges
  //     .map(edge => edge.direction)
  //     .filter(dir => dir !== 'contains')
  //     .sort((a, b) => a.localeCompare(b))
  //   return [...new Set(exits)]
  // }

  // // getType() {
  // //   const type = this.connection.index.nodeId[this.props.type]
  // //   return new Node(this.connection, type)
  // // }

  // some props are simple keyvalue items, some are relnships, etc
  async get(prop) {
    const map = {
      // contents: this.getContents,
      // exits: this.getExits,
      // type: this.getType,
    }
    const method = map[prop]
    return method ? method.bind(this)() : this.props[prop]
  }
}
