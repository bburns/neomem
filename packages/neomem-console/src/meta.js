const pathLib = require('path') // node lib
const api = require('./api')

// get meta information for a path, including views
async function getMeta(path) {
  const metaDefault = {
    view: {
      columns: [
        { key: 'name', width: 12 },
        { key: 'type', width: 12 },
        { key: 'description', width: 20 },
      ],
    },
  }
  const query = {
    path: pathLib.join(path, '.neomem'),
  }
  //. recurse upwards until find a .neomem item?
  const meta = (await api.get(query)) || metaDefault
  return meta
}

function getFields(meta) {
  const fields = meta.view.columns.map(col => col.key)
  return fields
}

module.exports = { getMeta, getFields }
