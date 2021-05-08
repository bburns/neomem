const types = [
  {
    key: 'folder',
    type: 'type',
    fields: 'name,extension,created,modified'.split(','),
  },
  {
    key: 'file',
    type: 'type',
    fields: 'name,extension,created,modified'.split(','),
  },
  // { key: 'name', type: 'field', datatype: 'string' },
  { key: 'extension', type: 'field', datatype: 'string' },
  // { key: 'created', type: 'field', datatype: 'dateISO' },
  // { key: 'modified', type: 'field', datatype: 'dateISO' },
]

function get() {
  return types
}

export { get }
