//. pass connection info through envars?
// eg mount point / root directory, eg /Users/bburns/Desktop
// similar for neo4j

const Hapi = require('@hapi/hapi') // rest api lib
const { Query } = require('neomem-util')
const { Data } = require('./data')

//. use lib to find open port, then register it with nmdata registry.
const port = process.env.PORT || 4002
const apiversion1 = '/api/v1/'

const init = async () => {
  const server = Hapi.server({
    host: 'localhost',
    port,
  })

  /******************************************************
   * Get contents of this datasource or meta item.
   * @returns {Promise<Object>}
   *****************************************************/
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