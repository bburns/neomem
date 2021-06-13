// table view

// prop is eg 'contents'
export async function table({ location, prop, meta }) {
  const node = await location.datasource.get(location.path)
  // const path = (await node.get('path')) || '.'
  const keys = await node.get(prop) // eg get('contents') -> array of itemkeys
  if (keys && keys.length > 0) {
    const nodes = []
    for (const key of keys) {
      // const subpath = path + '/' + key //. use this
      const subpath = key
      const node = await location.datasource.get(subpath)
      nodes.push(node)
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
    for (const [n, node] of nodes.entries()) {
      const obj = await node.get(columns)
      obj.n = n
      objs.push(obj)
    }
    return objs
  }
}

export function getRows(objs, columns) {
  const rows = [columns]
  for (const obj of objs) {
    const row = columns.map(column => obj[column])
    rows.push(row)
  }
  return rows
}

// class ViewTreetable {
//   constructor() {}
// }
