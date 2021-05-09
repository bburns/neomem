// json data driver

// get a connection, which has crud fns
export const connect = data => {
  //. build index
  const index = {}
  data.nodes.forEach(node => (index[node._id] = node))
  const get = id => index[id]
  const set = () => 2
  const update = () => 3
  const del = () => 4
  return {
    get,
    set,
    update,
    del,
  }
}
