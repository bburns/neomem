import utils from 'neomem-utils'


class Path {
  constructor(path) {
    this.parts = utils.getPathParts(path)
  }
  getFirst() {
    return this.parts[0]
  }
  getRest() {
    return this.parts.slice(1)
  }
  getRestAsPath() {
    return this.getRest().join('/')
  }
  getFirstName() {
    return this.getFirst()[0]
  }
}

export default function makePath(pathString) {
  const path = new Path(pathString)
  return path
}

