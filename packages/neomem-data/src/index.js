// neomem-data

const { gql, ApolloServer } = require('apollo-server')
const fetch = require('node-fetch')

const typeDefs = gql`
  type Node {
    name: String
  }
  type Query {
    neo4j: [Node]
  }
`
const body = { query: 'query { Fish { name }}' }

const resolvers = {
  Query: {
    neo4j: async (parent, args, context, info) => {
      // console.log(parent, args, context, info) // undefined, {}, bleh, {...}
      console.log(info.path)
      const response = await fetch('http://localhost:4102', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      })
      const json = await response.json()
      const fishes = json.data.Fish
      return fishes
    },
  },
}

// make apollo server
const server = new ApolloServer({ typeDefs, resolvers })

// start the server
server.listen({ port: 4100 }).then(({ url }) => {
  console.log(`GraphQL neomem server ready at ${url}`)
})
