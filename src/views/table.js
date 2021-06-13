// table view

//. handle tree recursion and graph traversal

// axis is eg 'contents', 'children'
export async function table({ node, meta, axis = null }) {
  // const path = (await node.get('path')) || '.'
  const subnodes = [node]
  if (axis) {
    const keys = await node.get(axis) // eg get('contents') -> array of itemkeys
    for (const key of keys) {
      // const subpath = path + '/' + key //. use this
      const subpath = key
      const subnode = await node.datasource.get(subpath)
      subnodes.push(subnode)
    }
  }
  const { columns } = meta
  const objs = []
  for (const [n, subnode] of subnodes.entries()) {
    const obj = await subnode.get(columns)
    obj.n = n
    objs.push(obj)
  }
  return objs
}
