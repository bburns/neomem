const resolvers = {
  Query: {
    info: () =>
      `This is a GraphQL endpoint for a JSON file (or js object if mocked)`,
    // get: (_, { id }, { datasources }) => (mocks ? nodes[id] : config.get(id)),
    get: (_, { id }, { dataSources }) => dataSources.configAPI.get(id),
    // nodes: () => (mocks ? Object.values(nodes) : Object.values(config.store)),
    nodes: (_, __, { dataSources }) =>
      Object.values(dataSources.configAPI.store),
    // authors: (parent, args, context, info) => authors,
    // books: (parent, args, context, info) => {
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => resolve(books), 500)
    //   })
    // },
  },
  Mutation: {
    set: (parent, args, { dataSources }, info) => {
      // console.log(parent, args, context, info)
      const node = {
        name: args.name,
        description: args.description,
      }
      // if (mocks) {
      //   nodes[node.id] = node
      // } else {
      //   config.set(node.id, node)
      // }
      dataSources.configAPI.set(node.id, node)
      return {
        success: true,
        message: null,
        node,
      }
    },
  },
}

module.exports = resolvers
