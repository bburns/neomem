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

const Metadata = {
  getFields,
  getKeys,
}

module.exports = { Metadata }
