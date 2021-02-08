//. i think this should be a class, for speed

// project an item's data into the list of fields.
function Projection(item, fields, types) {
  const projection = {}
  fields.forEach(field => {
    const dest = field.key // eg 'created'
    const source = field.source // eg 'date_added'
    const datatype = field.datatype || 'string' // eg 'date1601'
    const converter = types[datatype] // eg date1601
    const sourceValue = item[source] // eg '13818259345'
    const destValue = converter.parse(sourceValue) // eg '2021-02-01'
    projection[dest] = destValue
  })
  return projection
}

// // get requested fields for the given item
// function getProjection(item, query) {
//   const projection = {}
//   query.params.fields.forEach(field => (projection[field] = item[field]))
//   return projection
// }

module.exports = { Projection }
