const types = [
  {
    key: 'folder',
    type: 'type',
    fields: 'name,type,description,created,modified'.split(','),
  },
  {
    key: 'datasource',
    type: 'type',
    fields: 'name,type,description,created,url,created,modified'.split(','),
  },
  { key: 'name', type: 'field', datatype: 'string' },
  { key: 'description', type: 'field', datatype: 'string' },
  { key: 'type', type: 'field', datatype: 'string' },
  { key: 'url', type: 'field', datatype: 'string' },
  { key: 'created', type: 'field', datatype: 'dateISO' },
  { key: 'modified', type: 'field', datatype: 'dateISO' },
]

// module.exports = types

function get() {
  return types
}

module.exports = { get }
