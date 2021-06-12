export async function view(node, prop, meta) {
  const names = await node.get(prop)
  if (names && names.length > 0) {
    const rows = names.map((name, n) => {
      return { n, name }
    })
    // console.log(names.join('\n'))
    console.log(rows)
  }
}
