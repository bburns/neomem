// run a webserver to respond to get/post etc requests

//. could convert to es6 module so can do top-level await

// const Hapi = require('@hapi/hapi')
// const { Query } = require('neomem-util')
// const { Data } = require('./data')
import Hapi from '@hapi/hapi'
import { Query } from 'neomem-util'
import { Data } from './data'

const port = process.env.PORT || 4000
const apiversion1 = '/api/v1/'

process.on('unhandledRejection', err => {
  console.log(err)
  process.exit(1)
})

const init = async () => {
  const server = Hapi.server({ host: 'localhost', port })

  server.route({
    path: apiversion1 + '{path*}',
    method: 'GET',
    handler: async (request, h) => {
      const query = Query.makeFromRequest(request, apiversion1)
      const json = await Data.get(query)
      return json
    },
  })

  await server.start()
  console.log('Server running on %s', server.info.uri)
}

init()
