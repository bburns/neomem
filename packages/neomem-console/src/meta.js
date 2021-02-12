// handle metadata

const pathLib = require('path') // node lib
const api = require('./api')

// define default metadata including view columns
const defaultMetadata = {
  view: {
    columns: [
      { key: 'name', width: 12 },
      { key: 'type', width: 12 },
      { key: 'description', width: 20 },
    ],
  },
}

/**
 * get metadata information for a path, including views
 * @params path {TPath}
 */
async function getMetadata(path) {
  const query = {
    path: pathLib.join(path.str, '.neomem'),
  }
  console.debug('query', query)
  // const query = Query.makeFromRequest()
  //. recurse upwards until find a .neomem item?
  // or let the datasource handle that?
  const metadata = (await api.get(query)) || defaultMetadata
  return metadata
}

/**
 * get field names in view from metadata object
 * @params metadata {TMetadata}
 */
function getFields(metadata) {
  const fields = metadata.view.columns.map(col => col.key)
  return fields
}

module.exports = { getMetadata, getFields }
