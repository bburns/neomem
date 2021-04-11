import fs from 'fs' // node filesys lib

//. get user's folder - need node lib
// const chromePath = '/Users/bburns/Library/Application Support/Google/Chrome/Default/Bookmarks'

// note: can read and parse json file directly using require,
// but only works for files with .json extension -
// otherwise it thinks it's javascript.
// see https://stackoverflow.com/a/36591002/243392
// const examplePath = __dirname + '/../test/fixtures/example.json'
// const path = options.use === 'chrome' ? chromePath : examplePath
// console.log(`Reading ${path}...`)
// const path = __dirname + '/sample.json' // a smaller example file
const path = './sample.json' // a smaller example file
let bookmarks

const root = {
  name: 'bookmarks',
  type: 'datasource',
  description: 'Datasource for Chrome bookmarks (read-only)', //. duplicate of nmdata def
  // children: Object.values(bookmarks.roots),
}
// fetch items - could be from db so make async.
// could be a memoized fn eg for reading giant bookmarks file.
async function get() {
  bookmarks = JSON.parse(fs.readFileSync(path, 'utf-8'))
  root.children = Object.values(bookmarks.roots)
  return root
}

async function post() {}
async function put() {}
async function del() {}

const Root = { get, post, put, del }

export { Root }
