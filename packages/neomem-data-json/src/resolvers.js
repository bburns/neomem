const Conf = require('conf')

// get mock nodes and add id to each
const nodes = require('./fixtures/nodes')
Object.keys(nodes).forEach(id => (nodes[id].id = id))

// if node environment is 'test', use the mock nodes,
// else use the config file nodes.
const mocks = process.env.NODE_ENV === 'test'

// conf reads/writes to a file in user's config folder, wherever that may be.
// file:///Users/bburns/Library/Preferences/neomem-data-json-nodejs/config.json
const config = new Conf()

console.log('mocks', mocks)
console.log('config.path:', config.path)

const resolvers = {
  Query: {
    info: () =>
      `This is the GraphQL endpoint for a simple JSON file (or js object if mocked)`,
    get: (_, { id }) => (mocks ? nodes[id] : config.get(id)),
    nodes: () => (mocks ? Object.values(nodes) : Object.values(config.store)),
    // authors: (parent, args, context, info) => authors,
    // books: (parent, args, context, info) => {
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => resolve(books), 500)
    //   })
    // },
  },
  Mutation: {
    set: (parent, args, context, info) => {
      // console.log(parent, args, context, info)
      const node = args
      if (mocks) {
        nodes[node.id] = node
      } else {
        config.set(node.id, node)
      }
      return {
        code: 200,
        success: true,
        message: null,
        node,
      }
    },
  },
}

module.exports = resolvers
