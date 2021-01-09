const { ApolloServer } = require('apollo-server')
const { ApolloGateway } = require('@apollo/gateway')
require('dotenv').config()

const mocks = process.env.NODE_ENV === 'test'

// serviceList not needed with apollo studio
// const gateway = new ApolloGateway()

const gateway = new ApolloGateway({
  serviceList: [
    { name: 'neo4j', url: 'http://localhost:4001' },
    { name: 'filesys', url: 'http://localhost:4002' },
  ],
})

//. subscriptions not yet compatible with gateway, so must turn off
const server = new ApolloServer({ gateway, subscriptions: false })

server.listen({ port: 4000 }).then(({ url }) => {
  console.log(`GraphQL neomem server ready at ${url}`)
})
