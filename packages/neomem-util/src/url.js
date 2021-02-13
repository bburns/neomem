// just use node's url library
// see https://nodejs.org/api/url.html

const URL = require('url').URL

function make(url) {
  return new URL(url)
}

const Url = {
  make,
}

module.exports = { Url }
