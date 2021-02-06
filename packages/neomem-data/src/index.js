'use strict'

const Hapi = require('@hapi/hapi')
const fetch = require('node-fetch')
const { getQuery } = require('neomem-util')

//. use a lib to find open port?
const port = process.env.PORT || 4000

// hardcode these for now - eventually want a registry of plugins
//. query each node for description, nitems, etc, if requested?
const nodes = [
  { name: 'neo4j', type: 'datasource', url: 'http://localhost:4001' },
  { name: 'filesys', type: 'datasource', url: 'http://localhost:4002' },
  { name: 'bookmarks', type: 'datasource', url: 'http://localhost:4003' },
]

const root = {
  name: 'neomem-data',
  type: 'datasource',
  description: 'a federated data source',
  children: nodes,
}

const meta = {
  view: {
    columns: [
      { key: 'name', width: 10 },
      { key: 'type', width: 20 },
      { key: 'url', width: 20 },
      { key: 'description', width: 20 },
    ],
  },
}

const init = async () => {
  const server = Hapi.server({
    port,
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
    path: '/api/v1/.neomem',
    method: 'GET',
    handler: async (request, h) => {
      return meta
    },
  })

  server.route({
    path: '/api/v1/{path*}',
    method: 'GET',
    handler: async (request, h) => {
      const query = getQuery(request)
      const nodes = await getNodes(root, query)
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

async function getNodes(root, query) {
  const first = query.pathArray[0] // eg 'bookmarks'
  const rest = query.pathArray.slice(1).join('/') // eg 'books/scifi'
  const node = nodes.find(node => node.name === first)
  if (node && node.type === 'datasource') {
    // pass query along to other datasource
    const url = node.url + '/api/v1/' + rest + '?' + query.string
    const response = await fetch(url)
    const json = response.json()
    return json
  }
  if (Number(query.depth) === 0) {
    return getProjection(root, query)
  }
  return nodes.map(node => getProjection(node, query))
}

function getProjection(node, query) {
  const projection = {}
  query.fields.forEach(field => (projection[field] = node[field]))
  return projection
}
