// apollo bookmarks datasource.
// apollo lets you define datasource and pass them to your resolvers.
// it's not strictly necessary, as you can define the datasource in the resolver files.
// but it helps keep resolver file more concise.

// note: While the REST data source comes with its own built in cache,
// the generic data source does not.

const { DataSource } = require('apollo-datasource')

//. should we open the bookmarks file here? in constructor? or in indexjs?
// maybe this way we can test this datasource, by passing in a dummy file?

class BookmarksAPI extends DataSource {
  constructor({ bookmarks }) {
    // this seems to get called many times, so not good to put fileread here
    console.log('bookmarksAPI constructor')
    super()
    this.bookmarks = bookmarks
  }

  find(options) {
    console.log('find', options)
    if (options.flatten) {
      const nodes = collectNodes(Object.values(this.bookmarks.roots)[0])
      console.log(nodes)
      return nodes
    }
    const nodes = this.bookmarks.roots.bookmark_bar.children
    nodes.forEach(node => (node.date_added = getISODate(node.date_added)))
    return nodes
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

// from https://stackoverflow.com/a/52326586/243392
function collectNodes(rootNode) {
  const nodes = []
  function visitNode(node) {
    nodes.push(node)
    if (node.children) {
      node.children.forEach(visitNode)
      delete node.children
    }
  }
  visitNode(rootNode)
  return nodes
}
// const nodes = collectNodes(json.result.data.root)

module.exports = BookmarksAPI
