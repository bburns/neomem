// treetable view
// prop is eg 'contents'
export async function view(node, prop, meta, connection) {
  // const contents = await node.get('contents') // array of items
  // if (contents && contents.length > 0) print(contents.join('\n'))
  // const path = (await node.get('path')) || '.'
  const keys = await node.get(prop)
  if (keys && keys.length > 0) {
    const nodes = []
    for (const key of keys) {
      // const subpath = path + '/' + key //. use this
      const subpath = key
      const node = await connection.get(subpath)
      nodes.push(node)
    }
    const { columns } = meta
    const rows = [columns]
    for (const [n, node] of nodes.entries()) {
      const data = await node.get(columns)
      data.n = n
      const row = columns.map(column => data[column])
      rows.push(row)
    }
    return rows
  }
}
