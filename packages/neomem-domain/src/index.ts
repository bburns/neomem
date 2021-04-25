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

export function updateNode(node, nodes) {

}

export function getNode(_id, nodes) {
  return nodes[_id]
}

export function deleteNode() { }
