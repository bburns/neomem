import fs from 'fs/promises'
import libpath from 'path'
import liburl from 'url'
import { NodeFilesys } from './node.js'

// create __dirname since we're using esm modules
// see https://github.com/nodejs/help/issues/2907#issuecomment-757446568
// @ts-ignore
const __dirname = libpath.dirname(liburl.fileURLToPath(import.meta.url))

export const driver = {
  async connect(path) {
    const meta = eval(String(await fs.readFile(__dirname + '/meta.js')))
    return new ConnectionFilesys(path, meta)
  },
}

//

export class ConnectionFilesys {
  constructor(path, meta) {
    this.type = 'filesys'
    this.path = path
    this.initialLocation = '.'
    this.meta = meta
    this.filetypes = meta.nodes.filter(node => node.type === 'filetype')
  }

  // async load() {
  //   this.initialLocation = '.'
  // }

  getInitialLocation() {
    return this.initialLocation
  }

  async get(key) {
    key = libpath.normalize(key)
    const name = libpath.basename(key)
    // check for mounts
    //. distinguish plain json from json-timegraph - look inside for metadata.
    //. better to get type here - file, folder, mount, instead of in ./node.js?
    for (const filetype of this.filetypes) {
      if (key.endsWith('.' + filetype.extension)) {
        return new NodeFilesys(this, {
          _id: key,
          name,
          type: 'mount',
          driver: filetype.driver,
          source: libpath.join(this.path, key),
        })
      }
    }
    return new NodeFilesys(this, { _id: key, name })
  }
  set() {}
  update() {}
  del() {}
}
