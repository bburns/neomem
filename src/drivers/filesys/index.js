import fs from 'fs/promises'
import pathlib from 'path'
import { fileURLToPath } from 'url'
import { Node } from './node.js'

// must create __dirname since we're using esm modules
//. where put this stuff?
// see https://github.com/nodejs/help/issues/2907#issuecomment-757446568
// @ts-ignore
const __filename = fileURLToPath(import.meta.url)
const __dirname = pathlib.dirname(__filename)

export const driver = {
  async connect() {
    const meta = eval(String(await fs.readFile(__dirname + '/meta.js')))
    return new Connection(meta)
  },
}

//

export class Connection {
  constructor(meta) {
    this.type = 'filesys'
    this.path = null
    this.initialLocation = null
    this.meta = meta
    this.filetypes = meta.nodes.filter(node => node.type === 'filetype')
  }

  async load(path) {
    this.path = path
    this.initialLocation = '.'
  }

  getInitialLocation() {
    return this.initialLocation
  }

  async get(key) {
    key = pathlib.normalize(key)
    const name = pathlib.basename(key)
    // check for mounts
    //. distinguish plain json from json-timegraph - look inside for metadata.
    //. better to get type here - file, folder, mount, instead of in ./node.js?
    for (const filetype of this.filetypes) {
      if (key.endsWith('.' + filetype.extension)) {
        return new Node(this, {
          _id: key,
          name,
          type: 'mount',
          driver: filetype.driver,
          source: pathlib.join(this.path, key),
        })
      }
    }
    return new Node(this, { _id: key, name })
  }
  set() {}
  update() {}
  del() {}
}
