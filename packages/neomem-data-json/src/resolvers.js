const Conf = require('conf')
const nodes = require('./fixtures/nodes')

const mocks = process.env.NODE_ENV === 'test'

// conf reads/writes to a file in user's config folder, wherever that may be.
// file:///Users/bburns/Library/Preferences/neomem-data-json-nodejs/config.json
const config = new Conf()
console.log('config.path:', config.path)
// config.set('1234', {})
// console.log(config.get('1234'))

// const nodesDict = {}
// nodes.forEach(node => (nodesDict[node.id] = node))

const resolvers = {
  Query: {
    info: () => `This is the GraphQL endpoint for a simple JSON file`,
    // authors: (obj, args, context, info) => authors,
    // test: (_, { id }) => id,
    node: (_, { key }) => nodes[key],
    nodes: () => Object.values(nodes),
    // books: (obj, args, context, info) => {
    //   console.log(context)
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => resolve(books), 500)
    //   })
    // },
  },
}

module.exports = resolvers
