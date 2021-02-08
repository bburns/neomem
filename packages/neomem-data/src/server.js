const Hapi = require('@hapi/hapi')
const { Query } = require('neomem-util')
const { data } = require('./index')

//. use a lib to find open port, or pass in envar
const port = process.env.PORT || 4000

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
