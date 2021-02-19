'use strict'

const Hapi = require('@hapi/hapi') // rest api lib
const meta = require('./meta')
const data = require('./data')
const { Query } = require('neomem-util')

//. use lib to find open port, then register it with nmdata registry.
const port = process.env.PORT || 4003
const apiversion1 = '/api/v1'

const init = async () => {
  const server = Hapi.server({
    host: 'localhost',
    port,
  })

  // note: this handles both localhost:<port> and localhost:<port>/
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return `Try ${apiversion1}`
    },
  })

  /**
   * Get contents of this datasource or meta item.
   * @returns {Promise<Object>}
   */
  server.route({
    method: 'GET',
    path: `${apiversion1}/{path*}`,
    handler: async (request, h) => {
      const query = Query.makeFromRequest(request, apiversion1)
      //. if (query.meta) return getMetadata() // ?
      // if (query.path.endsWith('.neomem')) {
      if (query.isMeta) {
        const metadata = await meta.get()
        return metadata.view //. ok?
      }
      const items = await data.get(query, undefined)
      return items
    },
  })

  // start the api server
  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', err => {
  console.log(err)
  process.exit(1)
})

init()
