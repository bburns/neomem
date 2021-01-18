// apollo graphql server

const { ApolloServer } = require('apollo-server')
const { makeAugmentedSchema } = require('neo4j-graphql-js')
const typeDefs = require('./schema')
const options = require('./options')
require('dotenv').config()
const neo4j = require('neo4j-driver').v1

const schema = makeAugmentedSchema({ typeDefs })

const driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
)

const server = new ApolloServer({
  schema,
  context: { driver },
})

server.listen({ port: options.port }).then(({ url }) => {
  console.log(`GraphQL Neo4j server ready at ${url}`)
})
