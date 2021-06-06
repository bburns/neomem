// connection

import pathlib from 'path'
import { Node } from './node.js'
// import { drivers } from '../index.js'

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

  // crud operations

  async get(key) {
    key = pathlib.normalize(key)
    const name = pathlib.basename(key)
    return new Node(this, { _id: key, name })
  }

  set() {}
  update() {}
  del() {}
}
