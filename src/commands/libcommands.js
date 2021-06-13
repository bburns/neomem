import { drivers } from '../drivers/index.js'
import * as lib from '../lib.js'

// get a destination for a command
//. words could specify nothing, an adjacent edge name / direction,
// node name, abs path, id, rownum, adjective+noun, 'back', 'fwd',
// or something in the location history / context, connection string, etc.
// eg undefined, 'north', 'author', 'home', '/home', 'hello.txt', '2', 'books',
// 'back', 'blue mushroom', 'http://neomem.io/test.md'.
//. handle disambiguation - eg 'go mushroom' - could be the blue or red one.

//. should return a { datasource, location }?
// because could be looking at a different datasource + path,
// eg 'edit /home/blog/index.md/3' - datasource is markdown file, loc is 3

// location is { datasource, path }
export async function getDestination({ location, words, past, table }) {
  let path = words[1] || location.path

  //. get location from rownum in previous table
  if (lib.isNumber(path)) {
    path = table[Number(path)][1] //..
  }
  // get node of new location
  const node = await location.datasource.get(location.path)
  const type = await node.get('type')

  // if new node is a mount point, replace it with the target
  //. move this into getDestination also - want it for 'edit index.md' etc
  if (type === 'mount') {
    const driverName = await node.get('driver')
    const driver = drivers[driverName]
    location.datasource = await driver.connect(location)
    location.path = await location.datasource.get('initialPath')
  }

  return location
}
