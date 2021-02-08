'use strict'

const Hapi = require('@hapi/hapi') // rest api lib
const meta = require('./meta')
const data = require('./data')
const { getQuery } = require('neomem-util')

//. use lib to find open port, then register it with nmdata registry.
const port = process.env.PORT || 4003

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
      //. if (query.meta) return getMetadata() // ?
      if (query.path.endsWith('.neomem')) {
        const metadata = meta.get()
        return metadata
      }
      const items = await data.get(query)
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
