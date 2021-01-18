// apollo graphql server

const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const options = require('./options')

const Neo4jAPI = require('./datasources/neo4j')
const fs = require('fs')
// note: can read and parse json file directly using require,
// but only works for files with .json extension -
// otherwise it thinks it's javascript.
// see https://stackoverflow.com/a/36591002/243392
// const chromePath = '/Users/bburns/Library/Application Support/Google/Chrome/Default/Bookmarks'
const chromePath = __dirname + '/../test/fixtures/example2.json'
const examplePath = __dirname + '/../test/fixtures/example.json'
const path = options.use === 'chrome' ? chromePath : examplePath
console.log(`Reading ${path}...`)
const bookmarks = JSON.parse(fs.readFileSync(path, 'utf-8'))

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    bookmarksAPI: new Neo4jAPI({ bookmarks }),
  }),
})

server.listen({ port: options.port }).then(({ url }) => {
  console.log(`GraphQL Neo4j server ready at ${url}`)
})
