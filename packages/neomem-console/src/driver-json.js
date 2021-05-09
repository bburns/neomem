// json data driver

// get a connection, which has crud fns
export const connect = data => {
  // build index
  const nodeIndex = {}
  data.nodes.forEach(node => (nodeIndex[node.id] = node))

  // do query by example or get direct from id
  const get = async spec => {
    if (typeof spec === 'object') {
      if (spec.id) {
        return nodeIndex[spec.id]
      } else if (spec.name) {
        return data.nodes.find(node => node.name === spec.name)
      } else if (spec.from) {
        const ids = data.edges
          .filter(edge => edge.from === spec.from)
          .map(edge => edge.to)
        return ids.map(id => nodeIndex[id])
      }
      return 'Unknown spec: ' + JSON.stringify(spec)
    }
    return nodeIndex[spec]
  }

  const set = async (id, node) => 2

  const update = async (id, field, value) => 3

  const del = async id => 4

  const connection = { get, set, update, del }
  return connection
}
