// note: resolver functions take (parent, args, context, info) as params

const resolvers = {
  Query: {
    info: () => `This is a GraphQL endpoint for a JSON file`,
    findOne: (_, { id }, { dataSources }) => dataSources.configAPI.get(id),
    findAll: (_, __, { dataSources }) =>
      Object.values(dataSources.configAPI.get()),
  },

  Mutation: {
    set: (_, args, { dataSources }) => {
      const node = {
        name: args.name,
        description: args.description,
      }
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
