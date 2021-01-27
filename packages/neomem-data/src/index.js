const Hapi = require('@hapi/hapi')

const nodes = [
  { name: 'plecy', type: 'fish' },
  { name: 'neo4j', type: 'datasource', url: 'http://localhost:4101' },
  { name: 'filesys', type: 'datasource', url: 'http://localhost:4102' },
  { name: 'bookmarks', type: 'datasource', url: 'http://localhost:4103' },
]

const init = async () => {
  const server = Hapi.server({
    port: 4000,
    host: 'localhost',
  })

  server.route({
    method: 'GET',
    path: '/api/v1',
    handler: (request, h) => {
      const node = {
        name: 'neomem-data',
        type: 'datasource',
        description: 'a federated data source',
      }
      return node
    },
  })

  server.route({
    method: 'GET',
    path: '/api/v1/{path}',
    handler: (request, h) => {
      console.log(request.params.path)
      const pathparts = request.params.path.split('/')
      const firstpart = pathparts[0]
      const item = nodes.find(node => node.name === firstpart)
      return item
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
