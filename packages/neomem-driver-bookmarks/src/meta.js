// metadata for this datasource includes types, default view (columns etc).
//. save column layout to json file
//. have a meta.js/on for diff datasources in home/<user>/.config/neomem?

const metadata = {
  types: [
    { key: 'folder', fields: 'name,type,created,modified'.split(',') },
    { key: 'url', fields: 'name,type,created,url,created,modified'.split(',') },
    { key: 'name', datatype: 'string' },
    { key: 'type', datatype: 'string' },
    { key: 'url', datatype: 'string' },
    { key: 'created', datatype: 'date1601' },
    { key: 'modified', datatype: 'date1601' },
  ],
  views: {
    console: {
      list: {
        columns: [
          { key: 'name', width: 20 },
          { key: 'type', width: 12 },
          { key: 'url', width: 30 },
          { key: 'created', width: 13 },
          { key: 'modified', width: 13 },
        ],
      },
    },
  },
}

async function get() {
  return metadata
}

const Meta = {
  get,
}

module.exports = { Meta }
