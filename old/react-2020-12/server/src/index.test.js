const fetch = require('node-fetch')
const { describe } = require('riteway')

const url = 'http://localhost:4002/' // filesys

describe('filesys', async assert => {
  const query = `query { files { name } }`
  const json = await fetchGql(url, query)
  // console.log(JSON.stringify(json))
  assert({
    given: query,
    should: 'get file names',
    actual: json.data.files,
    expected: [{ name: 'Hello World' }, { name: 'Hello World' }],
  })
})

async function fetchGql(url, query) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip',
    },
    body: JSON.stringify({ query }),
  }
  const response = await fetch(url, options)
  const json = await response.json()
  return json
}
