const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const Conf = require('conf')
// const nodes = require('./fixtures/nodes')
const ConfigAPI = require('./datasources/config')

// // get mock nodes and add id to each
// Object.keys(nodes).forEach(id => (nodes[id].id = id))

// // if node environment is 'test', use the mock nodes,
// // else use the config file nodes.
// const mocks = process.env.NODE_ENV === 'test'

// conf reads/writes to a file in user's config folder, wherever that may be.
// file:///Users/bburns/Library/Preferences/neomem-data-json-nodejs/config.json
const config = new Conf()

// console.log('mocks', mocks)
console.log('config.path:', config.path)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    configAPI: new ConfigAPI({ config }),
  }),
})

server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`GraphQL json server ready at ${url}`)
})
