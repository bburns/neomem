import { drivers } from '../drivers/index.js'
import * as lib from '../lib.js'

// get a destination for a command
//. words could specify nothing, an adjacent edge name / direction,
// node name, abs path, id, rownum, adjective+noun, 'back', 'fwd',
// or something in the location history / context, connection string, etc.
// eg undefined, 'north', 'author', 'home', '/home', 'hello.txt', '2', 'books',
// 'back', 'blue mushroom', 'http://neomem.io/test.md'.
//. handle disambiguation - eg 'go mushroom' - could be the blue or red one.

// location is { datasource, path }
export async function getDestination({ location, words, past, table }) {
  const destination = { ...location }
  let path = words[1] || destination.path

  //. get location from rownum in previous table
  //. need to know table path also so can add the row name to it.
  // ie table needs to be a better data structure
  // if (lib.isNumber(path)) {
  // const rownum = Number(path)
  // path = table[rownum][1] //..
  // }

  // get node of new location
  //. will need to iterate down the path segments or tags, eg 'go foo/bar/baz'
  const node = await destination.datasource.get(path)
  const type = await node.get('type')

  // if new node is a mount point, replace it with the target
  if (type === 'mount') {
    path = await node.get('source')
    const driverName = await node.get('driver')
    const driver = drivers[driverName]
    destination.datasource = await driver.connect(path)
    destination.path = await destination.datasource.get('initialPath')
  }

  return destination
}

// get related items
export async function getRelated({ node, meta, axis = null }) {
  const subnodes = [node]
  if (axis) {
    const keys = await node.get(axis) // eg get('contents') -> array of itemkeys
    // const path = (await node.get('path')) || '.'
    for (const key of keys) {
      // const subpath = path + '/' + key //. use this
      const subpath = key
      const subnode = await node.datasource.get(subpath)
      subnodes.push(subnode)
    }
  }
  const { columns } = meta
  const objs = []
  for (const [n, subnode] of subnodes.entries()) {
    const obj = await subnode.get(columns)
    obj.n = n
    objs.push(obj)
  }
  return objs
}
