const util = require('./util')

// given a node and a query, return related nodes
//. handle pagination and recursion better
async function getNodes(node, query) {
  const first = query.path[0] // eg 'books'
  const rest = query.path.slice(1) // eg ['scifi']
  if (!first) {
    if (Number(query.depth) === 0) {
      return getProjection(node, query)
    }
    const nodes = node.children
      .slice(query.offset, query.offset + query.limit)
      .filter(node => node.name.includes(query.q) || node.url.includes(query.q))
      .map(node => getProjection(node, query))
    return nodes
  }

  const node2 = node.children.find(child => child.name === first)
  return getNodes(node2, { ...query, path: rest })
}

function getProjection(node, query) {
  const projection = {}
  query.fields.forEach(field => {
    // convert chrome dates to iso dates here
    if (field === 'created') {
      projection[field] = util.getISODate(node.date_added)
    } else if (field === 'modified') {
      projection[field] = util.getISODate(node.date_modified)
    } else {
      projection[field] = node[field]
    }
  })
  return projection
}

module.exports = getNodes
