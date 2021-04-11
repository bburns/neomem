// translate an item's data into a given list of fields.

const { Types } from './types')
// const { Query } from './query')

// const emptyQuery = Query.makeFromRequest()

/******************************************************
 * Translate an item's data into the given list of fields.
 * eg Translation.make(
 *   { date_added: '13818259345' },
 *   [{ key: 'created', source: 'date_added', datatype: 'date1601' }]),
 *   [{ date1601: { format: <fn>, parse: <fn> }}],
 * } => { created: '2021-02-01' }
 * @param item {Object}
 * @param fields {Object[]}
 *****************************************************/
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

// /******************************************************
//  * Project an item's data into the query's required fields. [and translate oops]
//  * @param item {Object}
//  * @param query {Query}
//  *****************************************************/
// function getProjection(item, query) {
//   const projection = {}
//   const fields = query.paramsObj.get('fields')
//   fields.split(',').forEach(field => {
//     const datatype = metadata.view.fields[field].datatype || 'string'
//     const sourcefield = metadata.view.fields[field].sourcefield
//     const converter = util.datatypes[datatype]
//     projection[field] = converter.parse(item[sourcefield])
//     // convert chrome dates to iso dates here
//     if (field === 'created') {
//       projection[field] = util.datatypes.date1601.getISODate(item.date_added)
//     } else if (field === 'modified') {
//       projection[field] = util.datatypes.date1601.getISODate(item.date_modified)
//     } else {
//       projection[field] = item[field]
//     }
//   })
//   return projection
// }

const Translation = {
  make,
}

export { Translation }
