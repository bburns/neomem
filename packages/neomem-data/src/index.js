// neomem-data

const { gql, ApolloServer } = require('apollo-server')
const fetch = require('node-fetch')
const GraphQLJSON = require('graphql-type-json')

// define datasource mount points
// the key is how the datasource is referred to from nmconsole,
// plugin is which datasource to query.
const mounts = {
  neo4j: { plugin: 'neo4j', url: 'http://localhost:4101' },
  bookmarks: { plugin: 'bookmarks', url: 'http://localhost:4103' },
}

// define queries, eg "bookmarks(subquery: String): JSON"
const queries = Object.keys(mounts)
  .map(mountKey => `${mountKey}(subquery: String): JSON`)
  .join('\n')

// define types
const typeDefs = gql`
  scalar JSON
  type Query {
    ${queries}
  }
`

// define query resolver for each mount point
const Query = {}
for (const [mountKey, mount] of Object.entries(mounts)) {
  Query[mountKey] = async (parent, args, context, info) => {
    const body = { query: args.subquery }
    const response = await fetch(mount.url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
    const json = await response.json()
    return json
  }
}

// define resolvers
const resolvers = {
  JSON: GraphQLJSON,
  Query,
}

// make apollo server
const server = new ApolloServer({ typeDefs, resolvers })

// start the server
server.listen({ port: 4100 }).then(({ url }) => {
  console.log(`GraphQL neomem server ready at ${url}`)
})
