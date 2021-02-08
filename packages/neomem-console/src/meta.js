const pathLib = require('path') // node lib
const api = require('./api')

const defaultMetadata = {
  view: {
    columns: [
      { key: 'name', width: 12 },
      { key: 'type', width: 12 },
      { key: 'description', width: 20 },
    ],
  },
}

// get meta information for a path, including views
async function getMeta(path) {
  const query = {
    path: pathLib.join(path, '.neomem'),
  }
  //. recurse upwards until find a .neomem item
  const metadata = (await api.get(query)) || defaultMetadata
  return metadata
}

function getFields(meta) {
  const fields = meta.view.columns.map(col => col.key)
  return fields
}

module.exports = { getMeta, getFields }
