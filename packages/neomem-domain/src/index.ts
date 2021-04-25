// crud

// type Node = {
//   _id: number,
//   key: string,
//   name: string,
//   alias: string,
// }

export function addNode(node, nodes) {
  const copy = { ...nodes }
  copy[node._id] = node
  return copy
}

export function updateNode(id, prop, value, nodes) {
  const copy = { ...nodes }
  const node = nodes[id]
  copy[nodes._id] = { ...node, [prop]: value }
  return copy
}

export function getNode(id, nodes) {
  // return nodes[id]
  const copy = { ...nodes[id] }
  return copy
}

export function deleteNode() { }
