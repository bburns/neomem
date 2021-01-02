const { ApolloServer, gql } = require('apollo-server')
const Conf = require('conf')

const mocks = process.env.NODE_ENV === 'test'

const config = new Conf()
config.set('unicorn', '🦄')
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

const nodes = [
  {
    id: '841723812838',
    name: 'plecy',
    type: 'fish',
    description: 'plecostomus catfish',
  },
  {
    id: '12395823747',
    name: 'glassfish',
    type: 'fish',
    description: 'an invisible fish',
  },
  {
    id: '537475293488234',
    name: 'The Awakening',
    type: 'book',
  },
  {
    id: '128387a942834',
    name: 'City of Glass',
    type: 'book',
  },
  {
    id: '1929388477732',
    name: 'Kate Chopin',
    type: 'person',
  },
  {
    id: '912387234773745',
    name: 'Paul Auster',
    type: 'person',
  },
]

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    nodes: () => nodes,
    // books: (obj, args, context, info) => {
    //   console.log(context)
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => resolve(books), 1000)
    //   })
    // },
    // authors: (obj, args, context, info) => authors,
  },
}

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers, mocks })

// The `listen` method launches a web server.
server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`GraphQL json server ready at ${url}`)
})
