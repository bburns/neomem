import pathlib from 'path'
import { Node } from './node.js'

export const driver = {
  connect() {
    return new Connection()
  },
}

export class Connection {
  constructor() {
    this.type = 'filesys'
    this.path = null
    this.initialLocation = null
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
    //... fix this
    // want some kind of automatic mount points depending on file type -
    // register based on extension somewhere.
    // distinguish plain json from json-timegraph - look inside for metadata.
    //. better to get type here - file, folder, mount, instead of in node.js?
    if (key.endsWith('.md')) {
      return new Node(this, {
        _id: key,
        name,
        type: 'mount',
        driver: 'markdown',
        source: pathlib.join(this.path, key),
      })
    }
    return new Node(this, { _id: key, name })
  }
  set() {}
  update() {}
  del() {}
}
