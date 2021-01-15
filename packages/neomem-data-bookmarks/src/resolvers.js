// apollo graphql resolvers.
// provide data for each defined type and field.
// note: resolver functions take (parent, args, context, info) as params.

const resolvers = {
  Query: {
    // findOne: (_, { id }, { dataSources }) =>
    //   dataSources.bookmarksAPI.findOne({ id }),
    findAll: (_, __, { dataSources }) => dataSources.bookmarksAPI.findAll(),
  },
}

module.exports = resolvers
