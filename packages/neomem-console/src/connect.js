// json data driver
//. driver.js ?

// get a connection, which has crud fns
export const connect = data => {
  // build index
  const nodeIndex = {}
  data.nodes.forEach(node => (nodeIndex[node._id] = node))

  // const get = id => nodeIndex[id]
  const get = spec => {
    if (typeof spec === 'object') {
      if (spec.id) {
        return nodeIndex[spec.id]
      }
      if (spec.name) {
        return data.nodes.find(node => node.name === spec.name)
      }
    }
    return nodeIndex[spec]
  }
  const set = (id, node) => 2
  const update = (id, field, value) => 3
  const del = id => 4

  const connection = { get, set, update, del }
  return connection
}
