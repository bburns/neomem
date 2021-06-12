// prop is eg 'contents'
export async function view(node, prop, meta, connection) {
  const path = (await node.get('path')) || '.'
  const keys = await node.get(prop)
  if (keys && keys.length > 0) {
    const nodes = []
    for (const key of keys) {
      // const subpath = path + '/' + key
      const subpath = key
      console.log(subpath)
      const node = await connection.get(subpath)
      nodes.push(node)
    }
    // console.log(nodes)
    // const rows = await nodes.map(async (node, n) => ({
    //   n,
    //   id: node._id,
    //   name: await node.get('name'),
    // }))
    const rows = []
    for (const [n, node] of nodes.entries()) {
      const row = {
        n,
        name: await node.get('name'),
        size: await node.get('size'),
        created: await node.get('created'),
        // modified: await node.get('modified'),
      }
      rows.push(row)
    }
    console.log(rows)
  }
}
