'use strict'

const Hapi = require('@hapi/hapi') // rest api lib
const { getItems } = require('./data')
const { getQuery } = require('neomem-util')
const meta = require('./meta')
const bookmarks = require('./bookmarks')

//. use lib to find open port, then register it with nmdata registry.
const port = process.env.PORT || 4003

const root = {
  name: 'bookmarks',
  type: 'datasource',
  description: 'Datasource for Chrome bookmarks. Read-only for now.',
  children: Object.values(bookmarks.roots),
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

  // return contents of this datasource or meta item
  server.route({
    method: 'GET',
    path: '/api/v1/{path*}',
    handler: async (request, h) => {
      const query = getQuery(request)
      //. if (query.meta) return getMeta() // ?
      if (query.path.endsWith('.neomem')) {
        const metadata = meta.get()
        return metadata
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
