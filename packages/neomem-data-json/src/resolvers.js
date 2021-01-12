// apollo graphql resolvers.
// provide data for each defined type and field.
// note: resolver functions take (parent, args, context, info) as params.

const resolvers = {
  Query: {
    info: () => `This is a GraphQL endpoint for a JSON file`,
    findOne: (_, { id }, { dataSources }) =>
      dataSources.configAPI.findOne({ id }),
    findAll: (_, __, { dataSources }) => dataSources.configAPI.findAll(),
  },

  Mutation: {
    create: (_, args, { dataSources }) => {
      const node = dataSources.configAPI.create(args)
      return {
        success: true,
        message: null,
        node,
      }
    },
  },
}

module.exports = resolvers
