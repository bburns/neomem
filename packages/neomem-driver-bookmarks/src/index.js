import Hapi from '@hapi/hapi' // rest api lib
import { Query } from 'neomem-util'
import { Data } from './data.js'

//. use lib to find open port, then register it with nm registry.
// or ask gateway for an open port and register it.
const port = process.env.PORT || 4003
const apiversion1 = '/api/v1/'

const init = async () => {
  const server = Hapi.server({
    host: 'localhost',
    port,
  })

  /**
   * Get contents of this datasource or meta item.
   * @returns {Promise<Object>}
   */
  server.route({
    method: 'GET',
    path: `${apiversion1}{path*}`,
    handler: async (request, h) => {
      const query = Query.makeFromRequest(request, apiversion1)
      const items = await Data.get(query)
      return items
    },
  })

  // start the server
  await server.start()
  console.log('Server running on %s', server.info.uri)
}

process.on('unhandledRejection', err => {
  console.log(err)
  process.exit(1)
})

init()
