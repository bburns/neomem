const util = require('./util')

// given an item and a query object, return related items.
async function get(query, start = item) {
  const first = query.pathArray[0] // eg 'books'
  const rest = query.pathArray.slice(1) // eg ['scifi']
  if (!first) {
    if (Number(query.depth) === 0) {
      return getProjection(start, query)
    }
    const items = start.children
      .slice(query.offset, query.offset + query.limit)
      .filter(item => item.name.includes(query.q) || item.url.includes(query.q))
      .map(item => getProjection(item, query))
    return items
  }
  const item2 = start.children.find(child => child.name === first)
  return get({ ...query, pathArray: rest }, item2) // recurse
}

// project an item's data into the query's required fields.
function getProjection(item, query) {
  const projection = {}
  query.fields.forEach(field => {
    // convert chrome dates to iso dates here
    if (field === 'created') {
      projection[field] = util.getISODate(item.date_added)
    } else if (field === 'modified') {
      projection[field] = util.getISODate(item.date_modified)
    } else {
      projection[field] = item[field]
    }
  })
  return projection
}

module.exports = { get }
