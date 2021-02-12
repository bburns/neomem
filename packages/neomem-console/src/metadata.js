// handle metadata

const pathLib = require('path') // node lib
const { Data } = require('./data')

// define default metadata including view columns
//. better place to store this?
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
async function get({ path }) {
  const query = {
    path: pathLib.join(path.str, '.neomem'),
  }
  // const query = Query.make({ path })
  //. recurse upwards until find a .neomem item?
  // let the datasource handle that?
  const metadata = (await Data.get({ query })) || defaultMetadata
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

const Metadata = {
  get,
}

// module.exports = { getMetadata, getFields }
module.exports = { Metadata }
