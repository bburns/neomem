// properties view
// used by console look and compare commands

// convert a list of node objects to a property table
//. call objs nodes? or are these prop objs?
export async function properties({ objs, meta }) {
  const { columns } = meta
  // const rows = [['property', 'value']]
  // const rows = [{ property: 'property', value: ['value'] }]
  const rows = { property: ['value'] }
  for (const column of columns) {
    // const values = objs.map(obj => obj[column])
    const values = objs.map(obj => {
      const oc = obj[column]
      // typeof obj[column] === 'object' ? obj[column].name : obj[column]
      // const type = typeof obj[column]
      if (Array.isArray(oc)) {
        // return an array? a string?
        // return oc.map(o => o.name).join(', ')
        // return oc.join(', ')
        const value = oc.map(o => {
          if (typeof o === 'object') {
            return o.props.name
          }
          return o
        })
        return value
      } else if (typeof oc === 'object') {
        return oc.props.name
      }
      return oc
    })
    // const row = [column, ...values]
    // const row = { property: column, value: values }
    // rows.push(row)
    rows[column] = values
  }
  return rows
}

// export async function properties({ node, meta, axis = null }) {
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
