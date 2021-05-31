// crud operations
// these are pure functions - take an array of nodes and return an updated copy.

import R from 'rambda'

// export function add(node, nodes) {
//   const copy = R.clone(nodes)
//   copy[node.id] = node
//   return copy
// }

export function get(id, nodes) {
  const node = nodes.find(node => node.id === id)
  return node
}

// export function update(id, prop, value, nodes) {
//   const copy = R.clone(nodes)
//   const node = nodes[id]
//   const props = 0
//   copy[id] = { ...node, [prop]: value }
//   return copy
// }

// export function remove(id, nodes) {
//   const copy = R.clone(nodes)
//   delete copy[id]
//   return copy
// }
