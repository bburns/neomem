// apollo graphql server

const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

const commandLineArgs = require('command-line-args')
const commandLineUsage = require('command-line-usage')

const BookmarksAPI = require('./datasources/bookmarks')
const fs = require('fs')
// can read and parse json file directly using require,
// but only works for json files with .json extension -
// otherwise it thinks it's javascript.
// see https://stackoverflow.com/a/36591002/243392
// const bookmarks = require('./example.json')
// const path =
//   '/Users/bburns/Library/Application Support/Google/Chrome/Default/Bookmarks.bak'
const path = __dirname + '/../test/fixtures/example.json'
const bookmarks = JSON.parse(fs.readFileSync(path, 'utf-8'))

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    bookmarksAPI: new BookmarksAPI({ bookmarks }),
  }),
})

server.listen({ port: 4009 }).then(({ url }) => {
  console.log(`GraphQL json server ready at ${url}`)
})
