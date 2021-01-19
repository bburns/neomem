// neomem-data

const { gql, ApolloServer } = require('apollo-server')
const fetch = require('node-fetch')

const typeDefs = gql`
  type Foo {
    name: String
  }
  type Query {
    neo4j(subquery: String): [Foo]
    filesys(subquery: String): [Foo]
    bookmarks(subquery: String): [Foo]
  }
`

const resolvers = {
  Query: {
    neo4j: async (parent, args, context, info) => {
      // console.log(parent, args, context, info) // undefined, {}, bleh, {...}
      // console.log(args.subquery) // "query{Fish{name}}"
      // console.log(info.fieldName) // "neo4j"
      // console.log(info.path) // { key: 'neo4j', ...}
      const body = { query: args.subquery }
      const response = await fetch('http://localhost:4101', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      })
      const json = await response.json()
      const nodes = json.data.Node
      return nodes
    },
    filesys: async (parent, args, context, info) => {
      const body = { query: args.subquery }
      const response = await fetch('http://localhost:4102', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      })
      const json = await response.json()
      const nodes = json.data.node
      return nodes
    },
    bookmarks: async (parent, args, context, info) => {
      const body = { query: args.subquery }
      const response = await fetch('http://localhost:4103', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      })
      const json = await response.json()
      const nodes = json.data.node
      return nodes
    },
  },
}

// make apollo server
const server = new ApolloServer({ typeDefs, resolvers })

// start the server
server.listen({ port: 4100 }).then(({ url }) => {
  console.log(`GraphQL neomem server ready at ${url}`)
})
