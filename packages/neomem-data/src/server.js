// run a webserver to respond to get/post etc requests

const Hapi = require('@hapi/hapi')
const { Query } = require('neomem-util')
const { Data } = require('./data')

const port = process.env.PORT || 4000

process.on('unhandledRejection', err => {
  console.log(err)
  process.exit(1)
})

//. could convert to es6 module so can do top-level await

const init = async () => {
  const server = Hapi.server({ host: 'localhost', port })

  server.route({
    path: '/api/v1/{path*}',
    method: 'GET',
    handler: async (request, h) => {
      const query = Query.parseRequest(request, '/api/v1')
      const json = await Data.get(query)
      return json
    },
  })

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

init()
