const meta = {
  view: {
    columns: [
      { key: 'name', width: 10 },
      { key: 'type', width: 16 },
      { key: 'url', width: 30 },
      { key: 'description', width: 20 },
    ],
  },
}

function getMeta() {
  return meta
}

module.exports = { getMeta }
