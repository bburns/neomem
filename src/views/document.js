// document view

export async function document({ objs, meta }) {
  const rows = []
  for (const obj of objs) {
    const { columns } = meta
    for (const column of columns) {
      // const row = [column, obj[column]]
      const row = { prop: column, value: obj[column] }
      rows.push(row)
    }
    rows.push(['-----------------'])
  }
  // return rows
  // return () => console.log(rows.join('\n'))
  return rows
}

// class ViewDocument {
//   constructor(rows) {
//     this.rows = rows
//   }
// }
