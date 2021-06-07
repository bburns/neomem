import pathlib from 'path'
import { Node } from './node.js'

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
    if (key.endsWith('.md')) {
      return new Node(this, {
        _id: key,
        type: 'mount',
        driver: 'markdown',
        source: pathlib.join(this.path, key),
        name,
      })
    }
    return new Node(this, { _id: key, name })
  }
  set() {}
  update() {}
  del() {}
}
