const { ApolloServer, gql } = require('apollo-server')
const fs = require('fs')

const mocks = process.env.NODE_ENV === 'test'

const typeDefs = gql`
  type File {
    path: String
    name: String
    size: Int
  }
  type Query {
    files: [File]
  }
`

//. glob is good/better - https://github.com/isaacs/node-glob
const resolvers = {
  Query: {
    files: () =>
      new Promise(resolve => {
        const files = fs
          .readdirSync('.', { withFileTypes: true })
          .filter(item => !item.isDirectory())
          .map(item => {
            var stat = fs.statSync(item.name)
            const size = stat.size
            return {
              path: item.path,
              name: item.name,
              size,
            }
          })
        resolve(files)
      }),
  },
}

const server = new ApolloServer({ typeDefs, resolvers, mocks })

server.listen({ port: 4002 }).then(({ url }) => {
  console.log(`GraphQL file server ready at ${url}`)
})
