'use strict'

const Hapi = require('@hapi/hapi')
const { getQuery } = require('neomem-util')
const meta = require('./meta')
const data = require('./data')

//. use a lib to find open port and register with nmdata registry
const port = process.env.PORT || 4000

const init = async () => {
  const server = Hapi.server({
    port,
    host: 'localhost',
  })

  server.route({
    path: '/',
    method: 'GET',
    handler: (request, h) => {
      return 'Try /api/v1/'
    },
  })

  server.route({
    path: '/api/v1/.neomem',
    method: 'GET',
    handler: async (request, h) => {
      const obj = meta.get()
      return obj
    },
  })

  server.route({
    path: '/api/v1/{path*}',
    method: 'GET',
    handler: async (request, h) => {
      const query = getQuery(request)
      // if (query.meta) return meta.get()
      const items = await data.get(query)
      return items
    },
  })

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', err => {
  console.log(err)
  process.exit(1)
})

init()
