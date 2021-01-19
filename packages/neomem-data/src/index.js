// neomem-data

const { gql, ApolloServer } = require('apollo-server')

const typeDefs = gql`
  type Foo {
    name: String
  }
  type Query {
    foo: [Foo]
  }
`

const resolvers = {
  Query: {
    foo: _ => [{ name: 'pokpok' }],
  },
  Foo: {
    name: _ => 'bradley',
  },
}

// make apollo server
const server = new ApolloServer({ typeDefs, resolvers })

// start the server
server.listen({ port: 4100 }).then(({ url }) => {
  console.log(`GraphQL neomem server ready at ${url}`)
})
