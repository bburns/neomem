let nodes = []

// load/save etc

export function clear() {
  nodes = []
}

// crud operations

export function add(node) {
  nodes.push(node)
}

export function get(id) {
  const node = nodes.find(node => node.id === id)
  return node
}

export function update(id, prop, value) {
  const node = get(id) || { id }
  const props = node.props || {}
  props[prop] = value
}

export function remove(id) {
  const i = nodes.findIndex(node => node.id === id)
  if (i !== -1) {
    nodes.splice(i, 1)
  }
}
