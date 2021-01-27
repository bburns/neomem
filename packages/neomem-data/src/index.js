const Hapi = require('@hapi/hapi')

const data = [
  { name: 'neo4j', type: 'datasource', url: 'http://localhost:4101' },
  { name: 'filesys', type: 'datasource', url: 'http://localhost:4102' },
  { name: 'bookmarks', type: 'datasource', url: 'http://localhost:4103' },
]

const init = async () => {
  const server = Hapi.server({
    port: 4000,
    host: 'localhost',
  })

  // server.route({
  //   method: 'GET',
  //   path: '/hello/{name}',
  //   handler: (request, h) => {
  //     return `Hello ${request.params.name}!`
  //   },
  // })

  server.route({
    method: 'GET',
    path: '/api/v1',
    handler: (request, h) => {
      const data = {
        name: 'neomem-data',
        type: 'datasource',
        description: 'a federated data source',
      }
      return data
    },
  })

  server.route({
    method: 'GET',
    path: '/api/v1/',
    handler: (request, h) => {
      // const data = [
      //   {
      //     name: 'neo4j',
      //     type: 'datasource',
      //     description: 'rest api for a neo4j database',
      //   },
      // ]
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
