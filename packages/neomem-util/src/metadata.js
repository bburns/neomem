// metadata
// functions for dealing with metadata

function getFields(metadata) {
  const fields = metadata.views.console.look.columns
    .map(col => col.key)
    .join(',')
  return fields
}

function getKeys(metadata) {
  const keys = metadata.views.console.look.columns.map(column => column.key)
  return keys
}

function getColumns(metadata) {
  const columns = metadata.views.console.look.columns
  return columns
}

const Metadata = {
  getFields,
  getKeys,
  getColumns,
}

export { Metadata }
