const { Types } = require('./types')
const { Query } = require('./query')

const emptyQuery = Query.make()

// translate an item's data into the given list of fields.
// eg Translation.make(
//   { date_added: '13818259345' },
//   [{ key: 'created', source: 'date_added', datatype: 'date1601' }]),
//   [{ date1601: { format: <fn>, parse: <fn> }}],
// } => { created: '2021-02-01' }
function make(item, fields = [], AdditionalTypes = {}) {
  // function make(item, query = emptyQuery, AdditionalTypes = {}) {
  // const fields = query.fields
  const translation = {}
  fields.forEach(field => {
    const dest = field.key // eg 'created'
    const source = field.source // eg 'date_added'
    const datatype = field.datatype || 'string' // eg 'date1601'
    const converter = Types.get(datatype) || AdditionalTypes.get(datatype) // eg date1601
    const sourceValue = item[source] // eg '13818259345'
    const destValue = converter.parse(sourceValue) // eg '2021-02-01'
    translation[dest] = destValue
  })
  return translation
}

const Translation = {
  make,
}

module.exports = { Translation }
