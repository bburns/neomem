//. handle updates to metadata eg view column layout -
// save to user's config folder
const metadata = {
  types: [
    {
      key: 'folder',
      fields: 'name,type,description,created,modified'.split(','),
    },
    {
      key: 'datasource',
      fields: 'name,type,description,created,url,created,modified'.split(','),
    },
  ],
  fields: [
    { key: 'name', datatype: 'string' },
    { key: 'description', datatype: 'string' },
    { key: 'type', datatype: 'string' },
    { key: 'url', datatype: 'string' },
    { key: 'created', datatype: 'dateISO' },
    { key: 'modified', datatype: 'dateISO' },
  ],
  view: {
    columns: [
      { key: 'name', width: 10 },
      { key: 'type', width: 16 },
      { key: 'url', width: 30 },
      { key: 'description', width: 20 },
    ],
  },
}

function get() {
  return metadata
}

module.exports = { get }
