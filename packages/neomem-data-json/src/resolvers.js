const Conf = require('conf')

const mocks = process.env.NODE_ENV === 'test'

// conf reads/writes to a file in user's config folder,
// wherever that may be.
const config = new Conf()
config.set('unicorn', 'foooo')
console.log(config.get('unicorn'))
console.log(config.path)

// mock data
const nodes = [
  {
    id: '838',
    name: 'plecy',
    type: 'fish',
    description: 'plecostomus catfish',
  },
]

const nodesDict = {}
nodes.forEach(node => (nodesDict[node.id] = node))

const resolvers = {
  Query: {
    info: () => `This is the GraphQL endpoint for a simple JSON file`,
    test: (_, { id }) => id,
    node: (_, { key }) => nodesDict[key],
    nodes: () => nodes,
    // books: (obj, args, context, info) => {
    //   console.log(context)
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => resolve(books), 500)
    //   })
    // },
    // authors: (obj, args, context, info) => authors,
  },
}

module.exports = resolvers
