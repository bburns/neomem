// apollo bookmarks datasource

// apollo lets you define datasources and pass them to your resolvers.
// it helps keep resolver file more concise.
// note: While the REST data source comes with its own built in cache,
// this generic data source does not.
const { DataSource } = require('apollo-datasource')

//. should we open the bookmarks file here? in constructor? or in indexjs?
// maybe this way we can test this datasource, by passing in a dummy file?
// yes that's prob why they did it this way.

class BookmarksAPI extends DataSource {
  constructor({ bookmarks }) {
    super()
    this.bookmarks = bookmarks
  }

  find(args) {
    const roots = Object.values(this.bookmarks.roots)
    const rootNode = {
      name: 'root',
      depth: 0,
      type: 'folder',
      guid: '',
      children: roots,
    }
    // if (args.flatten) {
    const nodes = collectNodes(rootNode)
    return nodes
    // }
    // return roots
  }

  find_by_id(args) {
    return null
  }
}

// flatten a tree of nodes
// from https://stackoverflow.com/a/52326586/243392
function collectNodes(rootNode) {
  const nodes = []
  function visitNode(node, depth) {
    node.depth = depth
    nodes.push(node)
    if (node.children) {
      node.children.forEach(node => visitNode(node, depth + 1))
    }
  }
  visitNode(rootNode, 0)
  console.log(nodes)
  return nodes
}

module.exports = BookmarksAPI
