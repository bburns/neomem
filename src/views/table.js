// table view

//. handle tree recursion and graph traversal

//. objs -> nodes?
export async function table({ objs, meta }) {
  let { columns } = meta
  columns = ['n', ...columns]
  const rows = [columns]
  for (const [n, obj] of objs.entries()) {
    // for (const obj of objs) {
    //.
    // const row = columns.map(column => obj[column])
    const row = columns.map(column => {
      if (column === 'n') {
        return n
      }
      return typeof obj[column] === 'object' ? obj[column].name : obj[column]
    })
    rows.push(row)
  }
  // for (let [n,row] of rows.entries()) {
  //   if (n === 0) {
  //   }
  // }
  return rows
}

// export async function table({ node, meta, axis = null }) {
//   const subnodes = [node]
//   if (axis) {
//     const keys = await node.get(axis) // eg get('contents') -> array of itemkeys
//     // const path = (await node.get('path')) || '.'
//     for (const key of keys) {
//       // const subpath = path + '/' + key //. use this
//       const subpath = key
//       const subnode = await node.datasource.get(subpath)
//       subnodes.push(subnode)
//     }
//   }
//   const { columns } = meta
//   const objs = []
//   for (const [n, subnode] of subnodes.entries()) {
//     const obj = await subnode.get(columns)
//     obj.n = n
//     objs.push(obj)
//   }
//   return objs
// }
