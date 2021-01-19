// neomem-data

const { gql, ApolloServer } = require('apollo-server')
const fetch = require('node-fetch')
const { GraphQLJSON, GraphQLJSONObject } = require('graphql-type-json')

const types = {
  neo4j: { port: 4101 },
  bookmarks: { port: 4103 },
}

const typeDefs = gql`
  scalar JSON
  type Query {
    neo4j(subquery: String): JSON
    bookmarks(subquery: String): JSON
  }
`

const resolvers = {
  JSON: GraphQLJSON,
  Query: {
    neo4j: async (parent, args, context, info) => {
      const body = { query: args.subquery }
      const response = await fetch('http://localhost:4101', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      })
      const json = await response.json()
      return json
    },
    bookmarks: async (parent, args, context, info) => {
      const body = { query: args.subquery }
      const response = await fetch('http://localhost:4103', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      })
      const json = await response.json()
      return json
    },
  },
}

// make apollo server
const server = new ApolloServer({ typeDefs, resolvers })

// start the server
server.listen({ port: 4100 }).then(({ url }) => {
  console.log(`GraphQL neomem server ready at ${url}`)
})
