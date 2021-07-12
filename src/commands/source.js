// a source is a data source that can be queried/iterated over etc.

//. also keep a cache of nodes, so user can switch views and use same data,
// or just re-show same data.

export function getSource({ node, meta }) {
  const source = new Source(node, meta)
  return source
}

class Source {
  constructor(node, meta) {
    this.node = node
    this.meta = meta
    this.pointer = node
    this.cache = {}
  }

  // need to project nodes into json objs according to metadata -  see getObjs
  async *getNodes(start, count) {
    if (this.meta.includeSelf) {
      yield this.node
    }
    //. fetch a block of data, add to cache, yield one by one.
    //. when reach end, try fetching more data using pagination info in header,
    // and repeat.
    if (this.meta.axis) {
      const nodes = await this.node.get(this.meta.axis)
      for await (let node of nodes) {
        yield node
      }
    }
  }

  // get js objs, which are projections of nodes according to meta columns
  async *getObjs(start, count) {
    const nodes = await this.getNodes(start, count)
    for await (let node of nodes) {
      const obj = await node.getProjection(this.meta) // get js obj
      yield obj
    }
  }
}
