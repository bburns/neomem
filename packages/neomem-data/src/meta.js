//. handle updates to metadata eg view column layout
// save to user's config folder?

//. make a class and treat as a db object with get, put, post, delete?

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
