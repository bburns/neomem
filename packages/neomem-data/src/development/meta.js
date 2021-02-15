//. handle updates to metadata eg view column layout -
// save to user's config folder

const metadata = {
  // view: {
  columns: [
    { key: 'name', width: 10 },
    { key: 'type', width: 16 },
    { key: 'url', width: 30 },
    { key: 'description', width: 20 },
  ],
  // },
}

async function get() {
  return metadata
}

async function post() {}
async function put() {}
async function del() {}

const Meta = { get, post, put, del }

module.exports = { Meta }
