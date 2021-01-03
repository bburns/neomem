const { ApolloServer } = require('apollo-server')
const Conf = require('conf')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const mocks = process.env.NODE_ENV === 'test'

const config = new Conf()
config.set('unicorn', 'foooo')
console.log(config.get('unicorn'))
console.log(config.path)

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers, mocks })

// The `listen` method launches a web server.
server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`GraphQL json server ready at ${url}`)
})
