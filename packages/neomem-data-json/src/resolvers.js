const Conf = require('conf')
const nodes = require('./fixtures/nodes')

// if node environment is 'test', use the memory nodes,
// else use the config file nodes.
const mocks = process.env.NODE_ENV === 'test'

// conf reads/writes to a file in user's config folder, wherever that may be.
// file:///Users/bburns/Library/Preferences/neomem-data-json-nodejs/config.json
const config = new Conf()

// add id to nodes
Object.keys(nodes).forEach(id => (nodes[id].id = id))

console.log('mocks', mocks)
console.log('config.path:', config.path)

const resolvers = {
  Query: {
    info: () =>
      `This is the GraphQL endpoint for a simple JSON file (or js object if mocked)`,
    get: (_, { id }) => (mocks ? nodes[id] : config.get(id)),
    nodes: () => (mocks ? Object.values(nodes) : Object.values(config.store)),
    // authors: (obj, args, context, info) => authors,
    // books: (obj, args, context, info) => {
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => resolve(books), 500)
    //   })
    // },
  },
  Mutation: {
    set: () => ({
      code: 200,
      success: true,
      message: null,
      node: { id: '1', name: 'lkmlkm' },
    }),
  },
}

module.exports = resolvers
