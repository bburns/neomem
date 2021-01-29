const Hapi = require('@hapi/hapi')
const fetch = require('node-fetch')

const nodes = [
  { name: 'plecy', type: 'fish' },
  { name: 'neo4j', type: 'datasource', url: 'http://localhost:4001' },
  { name: 'filesys', type: 'datasource', url: 'http://localhost:4002' },
  { name: 'bookmarks', type: 'datasource', url: 'http://localhost:4003' },
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
    path: '/api/v1/{path*}',
    handler: async (request, h) => {
      // console.log(request.params.path)
      // console.log(request.raw.req.url)
      const parts = request.params.path.split('/') // eg ['books']
      const queryString = request.raw.req.url.split('?').slice(1) // eg 'fields=name,type'
      const first = parts[0] // eg 'books'
      const rest = parts.slice(1).join('/')
      const node = nodes.find(node => node.name === first)
      if (node.type === 'datasource') {
        const url =
          node.url + '/api/v1/' + rest + (queryString ? '?' + queryString : '')
        const response = await fetch(url)
        const json = response.json()
        return json
      }
      return node
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
