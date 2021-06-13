// table view (aka treetable)

//. handle tree recursion and graph traversal

// axis is eg 'contents', 'children'
// export async function table({ location, prop, meta }) {
export async function table({ node, axis, meta }) {
  // const node = await location.datasource.get(location.path)
  // const path = (await node.get('path')) || '.'
  const keys = await node.get(axis) // eg get('contents') -> array of itemkeys
  const subnodes = []
  for (const key of keys) {
    // const subpath = path + '/' + key //. use this
    const subpath = key
    const subnode = await node.datasource.get(subpath)
    subnodes.push(subnode)
  }
  const { columns } = meta
  // const rows = [columns]
  // for (const [n, node] of nodes.entries()) {
  //   const data = await node.get(columns)
  //   data.n = n
  //   const row = columns.map(column => data[column])
  //   rows.push(row)
  //   rows.push(data)
  // }
  const objs = []
  for (const [n, subnode] of subnodes.entries()) {
    const obj = await subnode.get(columns)
    obj.n = n
    objs.push(obj)
  }
  return objs
}
