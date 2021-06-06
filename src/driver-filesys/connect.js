import pathlib from 'path'
import { Node } from './node.js'
import { driver as driverJson } from '../driver-json/index.js'

export class Connect {
  constructor() {
    this.path = null
  }

  async load(path) {
    this.path = path
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

//
