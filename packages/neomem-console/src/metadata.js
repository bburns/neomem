// handle metadata

// const pathLib = require('path') // node lib
const { Data } = require('./data')
const { Query } = require('neomem-util')

// define default metadata including view columns
//. better place to store? neomem-data?
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
 * @params path {TPath}
 */
async function get({ path }) {
  // const query = Query.make({ path, metadata: true })
  // console.log(25, query)
  //. recurse upwards until find a .neomem item?
  // let the datasource handle that?
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
