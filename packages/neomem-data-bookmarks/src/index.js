// apollo graphql server

const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const BookmarksAPI = require('./datasources/bookmarks')
// const Conf = require('conf')

// // conf reads/writes to a file in user's config folder, wherever that may be,
// // eg file:///Users/bburns/Library/Preferences/neomem-data-json-nodejs/config.json
// const config = new Conf()
// console.log('config.path:', config.path)

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    // configAPI: new BookmarksAPI({ config }),
    bookmarksAPI: new BookmarksAPI({ bookmarks }),
  }),
})

server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`GraphQL json server ready at ${url}`)
})
