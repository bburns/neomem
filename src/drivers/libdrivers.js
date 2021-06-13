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
