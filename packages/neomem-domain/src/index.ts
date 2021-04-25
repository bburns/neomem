// crud

// type Node = {
//   _id: number,
//   key: string,
//   name: string,
//   alias: string,
// }

export function add(node, nodes) {
  const copy = { ...nodes }
  copy[node._id] = node
  return copy
}

export function update(id, prop, value, nodes) {
  const copy = { ...nodes }
  const node = nodes[id]
  copy[nodes._id] = { ...node, [prop]: value }
  return copy
}

export function get(id, nodes) {
  const copy = { ...nodes[id] }
  return copy
}

export function remove(id, nodes) {
  const copy = { ...nodes }
  delete copy[id]
  return copy
 }
