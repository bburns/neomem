// api
// get, post, put, delete handlers

const querystring = require('querystring') // node lib https://nodejs.org/api/querystring.html
const fetch = require('node-fetch') // mimics browser's fetch

// define nmdata endpoint
//. pass as parameter
const baseUrl = 'http://localhost:4000/api/v1'
console.log('baseUrl', baseUrl)

// get json from the given uri
async function get(query) {
  // const s = `${query.path}?fields=name,type,url`
  const s = `${query.path}?${querystring.stringify(query)}`
  const options = {
    method: 'GET',
    headers: {
      'Accept-Encoding': 'gzip',
    },
  }
  // const url = path.join(baseUrl, s)
  const url = baseUrl + s
  console.log('fetch', url)
  const response = await fetch(url, options)
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