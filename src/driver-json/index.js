import fs from 'fs'

export const driver = {
  connect() {
    return new Connect()
  },
}

class Connect {
  constructor() {
    this.nodeIndex = {}
    this.edgeFromIndex = {}
    this.edgeToIndex = {}
    this.unlabelled = 'm4'
  }
  async load(path) {
    // read data
    const data = JSON.parse(String(await fs.readFileSync(path)))
    // get node index
    data.nodes.forEach(node => (this.nodeIndex[node._id] = node))
    // get edge indexes
    data.edges.forEach(edge => {
      if (this.edgeFromIndex[edge._from]) {
        this.edgeFromIndex[edge._from].push(edge)
      } else {
        this.edgeFromIndex[edge._from] = [edge]
      }
    })
  }
  //. these will be part of 'get'
  getNode(id) {
    const node = this.nodeIndex[id]
    return node
  }
  getType(node) {
    const type = this.nodeIndex[node.type]
    return type
  }
  getEdges(node) {
    const edges = this.edgeFromIndex[node._id] || []
    return edges
  }
  getContents(node) {
    const edges = this.getEdges(node)
    const contents = edges.map(edge => this.nodeIndex[edge._to].name).join(', ')
    return contents
  }
  getExits(node) {
    const edges = this.getEdges(node)
    const exits = edges
      .map(edge => this.nodeIndex[edge.type || this.unlabelled].name)
      .join(', ')
    return exits
  }
  get() {}
  set() {}
  update() {}
  del() {}
}
