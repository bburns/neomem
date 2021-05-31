// federated driver

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
    const node = this.nodes.find(node => node.id === id)
    return node
  }

  update(id, prop, value) {
    const node = this.get(id) || { id }
    const props = node.props || {}
    props[prop] = value
  }

  remove(id) {
    const i = this.nodes.findIndex(node => node.id === id)
    if (i !== -1) {
      this.nodes.splice(i, 1)
    }
  }
}
