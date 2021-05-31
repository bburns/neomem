// crud operations
// these are pure functions - take an array of nodes and return an updated copy.

let nodes = []

export function add(node) {
  nodes.push(node)
}

export function get(id) {
  const node = nodes.find(node => node.id === id)
  return node
}

export function update(id, prop, value) {
  const node = get(id) || {}
  const props = node.props
  props[prop] = value
}

// export function remove(id, nodes) {
//   const copy = R.clone(nodes)
//   delete copy[id]
//   return copy
// }
