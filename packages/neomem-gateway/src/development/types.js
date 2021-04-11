const types = [
  {
    key: 'folder',
    type: 'type',
    fields: 'name,type,description,created,modified'.split(','),
  },
  {
    key: 'datasource',
    type: 'type',
    fields: 'name,type,description,url,created,modified'.split(','),
  },
  { key: 'name', type: 'field', datatype: 'string' },
  { key: 'description', type: 'field', datatype: 'string' },
  { key: 'type', type: 'field', datatype: 'string' },
  { key: 'url', type: 'field', datatype: 'string' },
  { key: 'created', type: 'field', datatype: 'dateISO' },
  { key: 'modified', type: 'field', datatype: 'dateISO' },
]

async function get() {
  return types
}

const Types = {
  get,
  // post,
  // put,
  // del,
}

// module.exports = { Types }
export default { Types }
