// treetable view
// prop is eg 'contents'
export async function view(node, prop, meta, connection) {
  // const path = (await node.get('path')) || '.'
  const keys = await node.get(prop)
  if (keys && keys.length > 0) {
    const nodes = []
    for (const key of keys) {
      // const subpath = path + '/' + key
      // console.log(subpath)
      const subpath = key
      const node = await connection.get(subpath)
      nodes.push(node)
    }
    const rows = []
    const cols = 'name,size,created,modified'.split(',')
    for (const [n, node] of nodes.entries()) {
      const data = await node.get(cols)
      const row = { n, ...data }
      //   n,
      //   name: await node.get('name'),
      //   size: await node.get('size'),
      //   created: await node.get('created'),
      //   modified: await node.get('modified'),
      // }
      rows.push(row)
    }
    console.log(rows)
  }
}
