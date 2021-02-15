/**
 * Make a projection from an item and a list of fieldnames.
 * @param item {Object}
 * @param fields {string[]}
 */
function make(item, fields = []) {
  const projection = {}
  fields.forEach(field => (projection[field] = item[field]))
  return projection
}

const Projection = {
  make,
}

module.exports = { Projection }
