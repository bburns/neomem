// apollo graphql server for neo4j db

const { ApolloServer } = require('apollo-server')
const { makeAugmentedSchema } = require('neo4j-graphql-js')
const neo4j = require('neo4j-driver').v1
require('dotenv').config() // read .env into process.env
const options = require('./options') // get port etc
const typeDefs = require('./schema')

// get graphql schema
const augmentedSchema = makeAugmentedSchema({
  typeDefs,
})

// get neo4j driver
const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD),
  { encrypted: 'ENCRYPTION_OFF' }
)

// get apollo server
const server = new ApolloServer({
  schema: augmentedSchema,
  context: { driver },
})

// start the graphql server
server.listen({ port: options.port }).then(({ url }) => {
  console.log(`GraphQL Neo4j server ready at ${url}`)
})
