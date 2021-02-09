const { Types } = require('./types')
const { Query } = require('./query')

const emptyQuery = Query.make()

// project an item's data into the given list of fields.
// eg Projection.make(
//   { date_added: '13818259345' },
//   [{ key: 'created', source: 'date_added', datatype: 'date1601' }]),
//   [{ date1601: { format: <fn>, parse: <fn> }}],
// } => { created: '2021-02-01' }
function make(item, fields = [], AdditionalTypes = {}) {
  // function make(item, query = emptyQuery, AdditionalTypes = {}) {
  // const fields = query.fields
  const projection = {}
  fields.forEach(field => {
    const dest = field.key // eg 'created'
    const source = field.source // eg 'date_added'
    const datatype = field.datatype || 'string' // eg 'date1601'
    const converter = Types.get(datatype) || AdditionalTypes.get(datatype) // eg date1601
    const sourceValue = item[source] // eg '13818259345'
    const destValue = converter.parse(sourceValue) // eg '2021-02-01'
    projection[dest] = destValue
  })
  return projection
}

const Projection = {
  make,
}

module.exports = { Projection }
