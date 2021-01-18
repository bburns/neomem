// apollo graphql server

const { ApolloServer } = require('apollo-server')
const { makeAugmentedSchema } = require('neo4j-graphql-js')
const typeDefs = require('./schema')
// const resolvers = require('./resolvers')
const options = require('./options')
const { v1: neo4j } = require('neo4j-driver')

// const Neo4jAPI = require('./datasources/neo4j')
// const fs = require('fs')
// note: can read and parse json file directly using require,
// but only works for files with .json extension -
// otherwise it thinks it's javascript.
// see https://stackoverflow.com/a/36591002/243392
// const chromePath = '/Users/bburns/Library/Application Support/Google/Chrome/Default/Bookmarks'
// const bookmarks = JSON.parse(fs.readFileSync(path, 'utf-8'))

const schema = makeAugmentedSchema({ typeDefs })

const driver = neo4j.driver(
  'bolt://localhost:7687',
  neo4j.auth.basic('neo4j', 'zoeycat')
)

const server = new ApolloServer({
  // typeDefs,
  // resolvers,
  schema,
  context: { driver },
  // dataSources: () => ({
  //   bookmarksAPI: new Neo4jAPI({ bookmarks }),
  // }),
})

server.listen({ port: options.port }).then(({ url }) => {
  console.log(`GraphQL Neo4j server ready at ${url}`)
})
