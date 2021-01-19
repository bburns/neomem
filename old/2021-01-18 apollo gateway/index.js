// neomem-data

const { ApolloServer } = require('apollo-server')
require('dotenv').config() // read .env into process.env

// make federation gateway
const gateway = new ApolloGateway({
  serviceList: [
    { name: 'neo4j', url: 'http://localhost:4101' },
    { name: 'filesys', url: 'http://localhost:4102' },
    { name: 'bookmarks', url: 'http://localhost:4103' },
  ],
})

// make apollo server
//. subscriptions not yet compatible with gateway, so must turn off
const server = new ApolloServer({ gateway, subscriptions: false })

// start the server
server.listen({ port: 4100 }).then(({ url }) => {
  console.log(`GraphQL neomem server ready at ${url}`)
})
