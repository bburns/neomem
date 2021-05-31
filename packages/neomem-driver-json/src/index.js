// json driver

function connect() {
  return new Connection()
}

export const driver = { connect }

class Connection {
  constructor() {
    this.nodes = []
  }

  clear() {
    this.nodes = []
  }

  // crud operations

  add(node) {
    this.nodes.push(node)
  }

  get(id) {
    const node = this.nodes.find(node => node._id === id)
    return node
  }

  // prop could be id or name? eg id to disambiguate
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
}
