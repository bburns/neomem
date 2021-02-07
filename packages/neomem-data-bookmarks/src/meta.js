// metadata for this datasource includes types, default view (columns etc).
//. save column layout to json file
// have a meta.js for diff datasources in home/<user>/.config/neomem?
const metadata = {
  // types: [
  //   { key: 'folder', fields: }
  //   { key: 'url', fields: }
  // ],
  view: {
    columns: [
      { key: 'name', width: 20, datatype: 'string' },
      { key: 'type', width: 12, datatype: 'string' },
      { key: 'url', width: 30, datatype: 'string' },
      { key: 'created', width: 13, datatype: 'date1601' },
      { key: 'modified', width: 13, datatype: 'date1601' },
    ],
  },
}

function get() {
  return metadata
}

module.exports = { get }
