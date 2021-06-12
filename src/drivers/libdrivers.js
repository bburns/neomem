export async function get(node, spec, map) {
  const isArray = Array.isArray(spec)
  const props = isArray ? spec : [spec]
  const keyvalues = {}
  for (const prop of props) {
    const method = map[prop]
    const value = method ? await method.bind(node)() : node.props[prop]
    keyvalues[prop] = value
  }
  return isArray ? keyvalues : keyvalues[spec]
}
