/******************************************************
 * Make a projection from an item and a list of fieldnames.
 * @param item {Object}
 * @param fields {string} comma delim field names eg 'name,url'
 *****************************************************/
function make(item, fields) {
  const projection = {}
  fields.split(',').forEach(field => (projection[field] = item[field]))
  return projection
}

const Projection = {
  make,
}

export { Projection }
