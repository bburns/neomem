//. convert to es6 module so can do top-level await?

const Hapi = require('@hapi/hapi')
const { Query } = require('neomem-util')
const { Data } = require('./data')

//. use a lib to find open port, or pass in envar
const port = process.env.PORT || 4000

process.on('unhandledRejection', err => {
  console.log(err)
  process.exit(1)
})

const init = async () => {
  const server = Hapi.server({
    host: 'localhost',
    port,
  })

  server.route({
    path: '/api/v1/{path*}',
    method: 'GET',
    handler: async (request, h) => {
      const query = Query.make(request)
      const json = await Data.get(query)
      return json
    },
  })

  server.route({
    path: '/api/v1/{path*}',
    method: 'POST',
    handler: async (request, h) => {
      const query = Query.make(request)
      const json = await Data.post(query)
      return json
    },
  })

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

init()
