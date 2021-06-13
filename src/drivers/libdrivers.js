// import pathlib from 'path'

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

// // must create __dirname since we're using esm modules
// //. put in libdrivers
// // see https://github.com/nodejs/help/issues/2907#issuecomment-757446568
// // @ts-ignore
// const __filename = fileURLToPath(import.meta.url)
// const __dirname = pathlib.dirname(__filename)

// export function getDirname() {}
