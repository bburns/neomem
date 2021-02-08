// project an item's data into the query's required fields.
module.exports = function getProjection(item, fields, types) {
  const projection = {}
  fields.forEach(field => {
    // // eg convert chrome dates to iso dates
    // if (field === 'created') {
    //   projection[field] = util.datatypes.date1601.getISODate(item.date_added)
    // } else if (field === 'modified') {
    //   projection[field] = util.datatypes.date1601.getISODate(item.date_modified)
    // } else {
    //   projection[field] = item[field]
    // }
    const datatype = metadata.view.fields[field].datatype || 'string'
    const sourcefield = metadata.view.fields[field].sourcefield
    const converter = util.datatypes[datatype]
    projection[field] = converter.parse(item[sourcefield])
  })
  return projection
}
