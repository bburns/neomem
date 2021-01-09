const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const server = new ApolloServer({
  typeDefs,
  // dataSources: () => ({
  //   launchAPI: new LaunchAPI(),
  // }),
  resolvers,
})

// launch web server
server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`GraphQL json server ready at ${url}`)
})
