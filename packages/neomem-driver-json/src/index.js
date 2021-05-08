// neomem domain
// crud operations

export function add(node, nodes) {
  const copy = { ...nodes }
  copy[node._id] = node
  return copy
}

//. if id is an array, return array of nodes?
export function get(id, nodes) {
  const copy = { ...nodes[id] }
  return copy
}

export function update(id, prop, value, nodes) {
  const copy = { ...nodes }
  const node = nodes[id]
  copy[id] = { ...node, [prop]: value }
  return copy
}

export function remove(id, nodes) {
  const copy = { ...nodes }
  delete copy[id]
  return copy
}
