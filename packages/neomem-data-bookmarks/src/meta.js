//. handle updates to metadata - eg save column layout to json file
// have a meta.js for diff datasources in home/<user>/.config/neomem?

// metadata for this datasource includes the default view (columns etc).
const meta = {
  view: {
    columns: [
      { key: 'name', width: 20 },
      { key: 'type', width: 12 },
      { key: 'url', width: 30 },
      { key: 'created', width: 13 },
      { key: 'modified', width: 13 },
    ],
  },
}

function getMeta() {
  return meta
}

module.exports = { getMeta }
