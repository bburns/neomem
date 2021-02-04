const util = require('./util')

// given a node and a query, return related nodes
//. handle pagination and recursion better
function getNodes(node, query) {
  const first = query.path[0] // eg 'books'
  const rest = query.path.slice(1) // eg ['scifi']
  if (!first) {
    if (Number(query.depth) === 0) {
      return node
    }
    const nodes = node.children
      .slice(query.offset, query.offset + query.limit)
      .filter(node => node.name.includes(query.q) || node.url.includes(query.q))
      .map(node => {
        const projection = {}
        query.fields.forEach(field => {
          //. convert chrome dates to iso dates here
          if (field === 'created') {
            projection[field] = util.getISODate(node.date_added)
          } else if (field === 'modified') {
            projection[field] = util.getISODate(node.date_modified)
          } else {
            projection[field] = node[field]
          }
        })
        return projection
      })
    return nodes
  }
  const node2 = node.children.find(child => child.name === first)
  return getNodes(node2, { ...query, path: rest })
}

module.exports = getNodes
