'use strict'

const fs = require('fs') // node lib
const Hapi = require('@hapi/hapi') // rest api lib
const getItems = require('./getItems')
const { getQuery } = require('neomem-util')

//. use lib to find open port
const port = process.env.PORT || 4003

// read bookmarks
// note: can read and parse json file directly using require,
// but only works for files with .json extension -
// otherwise it thinks it's javascript.
// see https://stackoverflow.com/a/36591002/243392
//. how obtain user's folder etc?
// const chromePath = '/Users/bburns/Library/Application Support/Google/Chrome/Default/Bookmarks'
// const examplePath = __dirname + '/../test/fixtures/example.json'
// const chromePath = __dirname + '/../test/fixtures/example2.json'
// const path = options.use === 'chrome' ? chromePath : examplePath
// console.log(`Reading ${path}...`)
const path = __dirname + '/data/example.json' // a smaller example file
const bookmarks = JSON.parse(fs.readFileSync(path, 'utf-8'))

const root = {
  name: 'bookmarks',
  type: 'datasource',
  description: 'Datasource for Chrome bookmarks. Currently read-only.',
  children: Object.values(bookmarks.roots),
}

const meta = {
  view: {
    columns: [
      { key: 'name', width: 20 },
      { key: 'type', width: 12 },
      { key: 'url', width: 30 },
      { key: 'created', width: 13 },
      { key: 'modified', width: 13 },
    ],
  },
}

const init = async () => {
  const server = Hapi.server({
    host: 'localhost',
    port,
  })

  // note: this handles both localhost:<port> and localhost:<port>/
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return `Try /api/v1/`
    },
  })

  // return contents of this datasource
  server.route({
    method: 'GET',
    path: '/api/v1/{path*}',
    handler: async (request, h) => {
      const query = getQuery(request)
      if (query.path.endsWith('.neomem')) {
        return meta
      }
      const items = await getItems(root, query)
      return items
    },
  })

  // start the api server
  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', err => {
  console.log(err)
  process.exit(1)
})

init()
