const fetch = require('node-fetch') // mimics browser's fetch

// define nmdata endpoint
//. pass as parameter
const uri = 'http://localhost:4000'
console.log('uri', uri)

// get json from the given uri
async function get(query) {
  const options = {
    method: 'GET',
    headers: {
      // 'Content-Type': 'application/json',
      'Accept-Encoding': 'gzip',
    },
    // body: JSON.stringify(body),
  }
  const response = await fetch(uri, options)
  const json = await response.json()
  return json
}

// // post a query object as json to the given uri, return json response.
// async function post(query) {
//   const body = { query: query }
//   const options = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       'Accept-Encoding': 'gzip',
//     },
//     body: JSON.stringify(body),
//   }
//   const response = await fetch(uri, options)
//   const json = await response.json()
//   return json
// }

module.exports = { get }
