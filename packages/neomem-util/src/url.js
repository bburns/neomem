// just use node's url library
// see https://nodejs.org/api/url.html

//. or could rework it a bit to make it fit our way of doing things more

const URL = require('url').URL

function make(url) {
  return new URL(url)
}

const Url = {
  make,
}

module.exports = { Url }
