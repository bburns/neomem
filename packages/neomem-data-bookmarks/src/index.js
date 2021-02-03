'use strict'

const fs = require('fs') // node lib
const Hapi = require('@hapi/hapi') // rest api lib
const parseRequest = require('./parseRequest')

// read bookmarks
// note: can read and parse json file directly using require,
// but only works for files with .json extension -
// otherwise it thinks it's javascript.
// see https://stackoverflow.com/a/36591002/243392
// const chromePath = '/Users/bburns/Library/Application Support/Google/Chrome/Default/Bookmarks'
// const examplePath = __dirname + '/../test/fixtures/example.json'
// const chromePath = __dirname + '/../test/fixtures/example2.json'
// const path = options.use === 'chrome' ? chromePath : examplePath
// console.log(`Reading ${path}...`)
const path = __dirname + '/data/example.json'
const bookmarks = JSON.parse(fs.readFileSync(path, 'utf-8'))

const init = async () => {
  const server = Hapi.server({
    port: 4003,
    host: 'localhost',
  })

  // this handles both localhost:4003 and localhost:4003/
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return `Hello world!\n`
    },
  })

  // return metadata about this datasource
  server.route({
    method: 'GET',
    path: '/api/v1',
    handler: (request, h) => {
      const data = {
        name: 'neomem-data-bookmarks',
        type: 'datasource',
        description: 'a simple datasource saved to json file',
      }
      return data
    },
  })

  // return contents of this datasource
  server.route({
    method: 'GET',
    path: '/api/v1/{path*}',
    handler: (request, h) => {
      const query = parseRequest(request)
      const root = {
        name: 'root',
        type: 'folder',
        children: Object.values(bookmarks.roots),
      }
      const nodes = getNodes(root, query)
      return nodes
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

// given a node and a query, return related nodes
//. handle pagination and recursion better
function getNodes(node, query) {
  const first = query.path[0] // eg 'books'
  const rest = query.path.slice(1) // eg ['scifi']
  if (!first) {
    const nodes = node.children
      .slice(query.offset, query.offset + query.limit)
      .filter(node => node.name.includes(query.q) || node.url.includes(query.q))
      .map(node => {
        const projection = {}
        //. convert chrome dates to iso dates here?
        query.fields.forEach(field => (projection[field] = node[field]))
        console.log(projection)
        return projection
      })
    return nodes
  }
  const node2 = node.children.find(child => child.name === first)
  return getNodes(node2, { ...query, path: rest })
}
