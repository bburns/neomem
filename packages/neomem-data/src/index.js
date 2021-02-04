'use strict'

const Hapi = require('@hapi/hapi')
const fetch = require('node-fetch')
const { getQuery } = require('neomem-util')

// hardcode these for now - eventually want a registry of plugins
const nodes = [
  { name: 'neo4j', type: 'datasource', url: 'http://localhost:4001' },
  { name: 'filesys', type: 'datasource', url: 'http://localhost:4002' },
  { name: 'bookmarks', type: 'datasource', url: 'http://localhost:4003' },
  { name: 'plecy', type: 'fish' },
]

const root = {
  name: 'neomem-data',
  type: 'datasource',
  description: 'a federated data source',
  children: nodes,
}

const init = async () => {
  const server = Hapi.server({
    port: 4000,
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
    path: '/api/v1',
    method: 'GET',
    handler: (request, h) => {
      return root
    },
  })

  // server.route({
  //   path: '/api/v1/',
  //   method: 'GET',
  //   handler: (request, h) => {
  //     //. query each node for description, nitems, etc, if requested?
  //     return nodes
  //   },
  // })

  server.route({
    path: '/api/v1/{path*}',
    method: 'GET',
    handler: async (request, h) => {
      // console.log(request.params.path)
      // console.log(request.raw.req.url)
      const pathParts = request.params.path.split('/') // eg ['books']
      // const query = request.raw.req.url.split('?').slice(1)[0] // eg 'fields=name,type'
      const query = getQuery(request)
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
      if (query.depth === '0') {
        return root
      }
      return nodes
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
