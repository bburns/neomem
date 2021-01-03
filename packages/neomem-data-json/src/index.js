const { ApolloServer, gql } = require('apollo-server')
const Conf = require('conf')
const resolvers = require('./resolvers')

const mocks = process.env.NODE_ENV === 'test'

const config = new Conf()
config.set('unicorn', 'foooo')
console.log(config.get('unicorn'))
console.log(config.path)

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Node {
    id: String
    name: String
    type: String
    description: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    nodes: [Node]
  }
`

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers, mocks })

// The `listen` method launches a web server.
server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`GraphQL json server ready at ${url}`)
})
