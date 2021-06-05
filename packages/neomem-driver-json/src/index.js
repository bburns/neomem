// json driver

//. this is actually driver-timegraph?
// ie assumes nodes, edges, history 'tables'
// should be able to connect to different datastores
// so this is the api, those are drivers?

function connect() {
  return new Connection()
}

export const driver = { connect }

class Connection {
  constructor() {
    this.nodes = []
  }

  // crud operations

  add(node) {
    this.nodes.push(node)
  }

  //. id could be a number, a name, an object (qbe), a fn?
  get(id) {
    const node = this.nodes.find(node => node._id === id)
    return node
  }

  //. prop could be id or name? eg id to disambiguate
  update(id, prop, value) {
    const node = this.get(id) || { id }
    const props = node.props || {}
    props[prop] = value
  }

  remove(id) {
    const i = this.nodes.findIndex(node => node._id === id)
    if (i !== -1) {
      this.nodes.splice(i, 1)
    }
  }

  // extra operations

  clear() {
    this.nodes = []
  }
}
