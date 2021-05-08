//. handle updates to metadata eg view column layout -
// save to user's config folder

const metadata = {
  views: {
    console: {
      look: {
        columns: [
          { key: 'name', width: 14 },
          { key: 'type', width: 16 },
          { key: 'url', width: 30 },
          { key: 'description', width: 40 },
        ],
      },
    },
  },
}

async function get() {
  return metadata
}

async function post() {}
async function put() {}
async function del() {}

const Meta = { get, post, put, del }

export { Meta }
