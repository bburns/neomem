// handle metadata

// const pathLib = require('path') // node lib
const { Data } = require('./data')
const { Query } = require('neomem-util')

// define default metadata including view columns
//. move to neomem-data, yes?
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
 * Get metadata information for a path, including views.
 * @params path {TPath} datapath eg { str: '/bookmarks/books/scifi', ... }
 */
async function get({ path } = {}) {
  // const query = Query.make({ path, metadata: true })
  // const metadata = (await Data.get({ query })) || defaultMetadata
  const metadata = (await Data.get({ path })) || defaultMetadata
  return metadata
}

// /**
//  * get field names in view from metadata object
//  * @params metadata {TMetadata}
//  */
// function getFields(metadata) {
//   const fields = metadata.view.columns.map(col => col.key)
//   return fields
// }

const Metadata = {
  get,
}

// module.exports = { getMetadata, getFields }
module.exports = { Metadata }
