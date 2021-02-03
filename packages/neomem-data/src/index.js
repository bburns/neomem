'use strict'

const Hapi = require('@hapi/hapi')
const fetch = require('node-fetch')

// hardcode these for now - eventually want a registry of plugins
const nodes = [
  { name: 'neo4j', type: 'datasource', url: 'http://localhost:4001' },
  { name: 'filesys', type: 'datasource', url: 'http://localhost:4002' },
  { name: 'bookmarks', type: 'datasource', url: 'http://localhost:4003' },
  { name: 'plecy', type: 'fish' },
]

const init = async () => {
  const server = Hapi.server({
    port: 4000,
    host: 'localhost',
  })

  server.route({
    path: '/api/v1',
    method: 'GET',
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
    path: '/api/v1/',
    method: 'GET',
    handler: (request, h) => {
      //. query each node for description, nitems, etc, if requested?
      return nodes
    },
  })

  server.route({
    path: '/api/v1/{path*}',
    method: 'GET',
    handler: async (request, h) => {
      // console.log(request.params.path)
      // console.log(request.raw.req.url)
      const pathParts = request.params.path.split('/') // eg ['books']
      const query = request.raw.req.url.split('?').slice(1)[0] // eg 'fields=name,type'
      const first = pathParts[0] // eg 'books'
      const rest = pathParts.slice(1).join('/')
      const node = nodes.find(node => node.name === first)
      if (node && node.type === 'datasource') {
        // pass query along to other datasource
        const url = node.url + '/api/v1/' + rest + (query ? '?' + query : '')
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
