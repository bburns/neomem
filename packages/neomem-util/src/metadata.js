// metadata
// functions for dealing with metadata

function getFields(metadata) {
  const fields = metadata.views.console.look.columns
    .map(col => col.key)
    .join(',')
  return fields
}

const Metadata = {
  getFields,
}

module.exports = { Metadata }
