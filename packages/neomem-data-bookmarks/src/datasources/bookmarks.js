// apollo bookmarks datasource.

// apollo lets you define datasources and pass them to your resolvers.
// it helps keep resolver file more concise.

const { DataSource } = require('apollo-datasource')

//. should we open the bookmarks file here? in constructor? or in indexjs?
// maybe this way we can test this datasource, by passing in a dummy file?
// yes that's prob why they did it this way.

// note: While the REST data source comes with its own built in cache,
// this generic data source does not.

class BookmarksAPI extends DataSource {
  constructor({ bookmarks }) {
    super()
    this.bookmarks = bookmarks
  }

  find(args) {
    const roots = Object.values(this.bookmarks.roots)
    const rootNode = { name: 'root', type: 'folder', guid: '', children: roots }
    if (args.flatten) {
      const nodes = collectNodes(rootNode)
      return nodes
    }
    const nodes = roots
    nodes.forEach(node => (node.date_added = getISODate(node.date_added)))
    return nodes
  }

  find_by_id(args) {
    return null
  }
}

// convert from 1601-based datestring to iso string.
// chrome bookmark times are relative to 1601-01-01.
// from https://stackoverflow.com/questions/51343828/how-to-parse-chrome-bookmarks-date-added-value-to-a-date
const dateStart1601 = Date.UTC(1601, 0, 1)
function getISODate(dateString1601) {
  const date = new Date(dateStart1601 + Number(dateString1601) / 1000)
  return date.toISOString()
}

// flatten a tree of nodes
// from https://stackoverflow.com/a/52326586/243392
function collectNodes(rootNode) {
  const nodes = []
  function visitNode(node) {
    nodes.push(node)
    if (node.children) {
      node.children.forEach(visitNode)
    }
  }
  visitNode(rootNode)
  return nodes
}

module.exports = BookmarksAPI
