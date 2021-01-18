// apollo graphql server

const { ApolloServer } = require('apollo-server')
const fs = require('fs')
const options = require('./options')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const BookmarksAPI = require('./datasources/bookmarks')

// read bookmarks
// note: can read and parse json file directly using require,
// but only works for files with .json extension -
// otherwise it thinks it's javascript.
// see https://stackoverflow.com/a/36591002/243392
// const chromePath = '/Users/bburns/Library/Application Support/Google/Chrome/Default/Bookmarks'
const examplePath = __dirname + '/../test/fixtures/example.json'
const chromePath = __dirname + '/../test/fixtures/example2.json'
const path = options.use === 'chrome' ? chromePath : examplePath
console.log(`Reading ${path}...`)
const bookmarks = JSON.parse(fs.readFileSync(path, 'utf-8'))

// make apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    bookmarksAPI: new BookmarksAPI({ bookmarks }),
  }),
})

// start server
server.listen({ port: options.port }).then(({ url }) => {
  console.log(`GraphQL bookmark server ready at ${url}`)
})
