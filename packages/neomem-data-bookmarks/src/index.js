'use strict'

const Hapi = require('@hapi/hapi')

const init = async () => {
  const server = Hapi.server({
    port: 6000,
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
    path: '/api/v1',
    handler: (request, h) => {
      const data = {
        name: 'neomem-data',
        type: 'datasource',
        description: 'a simple datasource saved to json file',
      }
      return data
    },
  })

  server.route({
    method: 'GET',
    path: '/api/v1/',
    handler: (request, h) => {
      const data = [
        {
          name: 'neo4j',
          type: 'datasource',
          description: 'rest api for a neo4j database',
        },
      ]
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
