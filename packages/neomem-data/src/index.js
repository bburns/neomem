// neomem-data

const { gql, ApolloServer } = require('apollo-server')
const fetch = require('node-fetch')

const typeDefs = gql`
  type Foo {
    name: String
  }
  type Query {
    foo: [Foo]
  }
`
const body = { query: 'query { Fish { name }}' }

const resolvers = {
  Query: {
    // foo: _ => [{ name: 'pokpok' }],
    foo: async _ => {
      const response = await fetch('http://localhost:4102', {
        method: 'POST',
        body: JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' },
      })
      // console.log(response)
      // return response
      const json = await response.json()
      console.log(json)
      // return json
      const fishes = json.data.Fish
      return fishes
    },
  },
  // Foo: {
  //   name: _ => 'bradley',
  // },
}

// make apollo server
const server = new ApolloServer({ typeDefs, resolvers })

// start the server
server.listen({ port: 4100 }).then(({ url }) => {
  console.log(`GraphQL neomem server ready at ${url}`)
})
