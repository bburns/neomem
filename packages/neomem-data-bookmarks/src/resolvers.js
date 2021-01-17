// apollo graphql resolvers.
// provide data for each defined type and field.

// note: By keeping resolvers thin as a best practice, you can safely
// refactor your backing logic while reducing the likelihood of breaking your API.
// hence most code is in the datasources.

// note: resolver functions take (parent, args, context, info) as params.

const resolvers = {
  Query: {
    node: (_, args, { dataSources }) => dataSources.bookmarksAPI.find(args),
    node_by_id: (_, args, { dataSources }) =>
      dataSources.bookmarksAPI.find_by_id(args),
  },
}

module.exports = resolvers
