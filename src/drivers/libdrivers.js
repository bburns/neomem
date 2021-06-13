// import pathlib from 'path'

// get a node property value
export async function get(node, spec, accessorMap) {
  const isArray = Array.isArray(spec)
  const props = isArray ? spec : [spec]
  const keyvalues = {}
  for (const prop of props) {
    const method = accessorMap[prop]
    const value = method ? await method.bind(node)() : node.props[prop]
    keyvalues[prop] = value
  }
  return isArray ? keyvalues : keyvalues[spec]
}

// // must create __dirname since we're using esm modules
// //. put in libdrivers - ehh, must define within the file itself
// // see https://github.com/nodejs/help/issues/2907#issuecomment-757446568
// // @ts-ignore
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = pathlib.dirname(__filename)

// export function getDirname() {}

// get rough size of an object
// source https://stackoverflow.com/a/11900218/243392
export function sizeOf(obj) {
  const objectList = []
  const stack = [obj]
  let bytes = 0
  while (stack.length) {
    var value = stack.pop()
    if (typeof value === 'boolean') {
      bytes += 4
    } else if (typeof value === 'string') {
      bytes += value.length * 2
    } else if (typeof value === 'number') {
      bytes += 8
    } else if (typeof value === 'object' && objectList.indexOf(value) === -1) {
      objectList.push(value)
      for (var i in value) {
        stack.push(value[i])
      }
    }
  }
  return bytes
}
