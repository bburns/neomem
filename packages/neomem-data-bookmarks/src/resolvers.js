// apollo graphql resolvers.
// provide data for each defined type and field.

// note: resolver functions take (parent, args, context, info) as params.

// note: By keeping resolvers thin as a best practice, you can safely
// refactor your backing logic while reducing the likelihood of breaking your API.
// hence most code is in the datasources.

const resolvers = {
  Query: {
    bookmark: (_, args, { dataSources }) => dataSources.bookmarksAPI.find(args),
    bookmark_by_pk: (_, args, { dataSources }) =>
      dataSources.bookmarksAPI.find_by_id(args),
  },
}

module.exports = resolvers
