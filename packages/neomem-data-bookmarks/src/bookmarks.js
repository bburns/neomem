// read bookmarks

const fs = require('fs') // node lib

//. how obtain user's folder etc?
// const chromePath = '/Users/bburns/Library/Application Support/Google/Chrome/Default/Bookmarks'

// note: can read and parse json file directly using require,
// but only works for files with .json extension -
// otherwise it thinks it's javascript.
// see https://stackoverflow.com/a/36591002/243392
// const examplePath = __dirname + '/../test/fixtures/example.json'
// const path = options.use === 'chrome' ? chromePath : examplePath
// console.log(`Reading ${path}...`)
const path = __dirname + '/example.json' // a smaller example file
const bookmarks = JSON.parse(fs.readFileSync(path, 'utf-8'))

module.exports = bookmarks
