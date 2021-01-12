'use strict'

const Hapi = require('@hapi/hapi')

const init = async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
  })

  server.route({
    method: 'GET',
    path: '/hello/{name}',
    handler: (request, h) => {
      return `Hello ${request.params.name}!`
    },
  })

  server.route({
    method: 'GET',
    path: '/data',
    handler: (request, h) => {
      const data = {
        name: 'pokpok',
        type: 'book',
        description: 'lakmsd wiuehriwuhe riuh',
      }
      return data
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
