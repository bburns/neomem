'use strict'

const Hapi = require('@hapi/hapi')
const fs = require('fs')
// const options = require('./options')

// read bookmarks
// note: can read and parse json file directly using require,
// but only works for files with .json extension -
// otherwise it thinks it's javascript.
// see https://stackoverflow.com/a/36591002/243392
// const chromePath = '/Users/bburns/Library/Application Support/Google/Chrome/Default/Bookmarks'
// const examplePath = __dirname + '/../test/fixtures/example.json'
// const chromePath = __dirname + '/../test/fixtures/example2.json'
// const path = options.use === 'chrome' ? chromePath : examplePath
// console.log(`Reading ${path}...`)
const path = __dirname + '/data/example.json'
const bookmarks = JSON.parse(fs.readFileSync(path, 'utf-8'))

const init = async () => {
  const server = Hapi.server({
    port: 4003,
    host: 'localhost',
  })

  // server.route({
  //   method: 'GET',
  //   path: '/hello/{name}',
  //   handler: (request, h) => {
  //     return `Hello ${request.params.name}!`
  //   },
  // })

  // this handles both localhost:4003 and localhost:4003/
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, h) => {
      return `Hello world!\n`
    },
  })

  // return metadata about this datasource
  server.route({
    method: 'GET',
    path: '/api/v1',
    handler: (request, h) => {
      const data = {
        name: 'neomem-data-bookmarks',
        type: 'datasource',
        description: 'a simple datasource saved to json file',
      }
      return data
    },
  })

  // return contents of this datasource
  //. handle pagination - keyset or just offset via slicing json array
  server.route({
    method: 'GET',
    path: '/api/v1/{s}',
    handler: (request, h) => {
      console.log(request.params.s)
      const data = bookmarks
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