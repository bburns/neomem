//. handle updates to metadata eg view column layout
// save to user's config folder?
const metadata = {
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
