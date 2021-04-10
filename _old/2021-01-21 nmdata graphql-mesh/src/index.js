// neomem-data
// see .meshrc.yaml

const { gql, ApolloServer } = require('apollo-server')
const fetch = require('node-fetch')
// const GraphQLJSON = require('graphql-type-json')

// define datasource mount points
// the key is how the datasource is referred to from nmconsole,
// plugin is which datasource to query.
//. this will eventually be stored in filesystem somewhere.
//. on running this app, will scan these plugins to see if still there,
// and poll every n secs to see if still there.
// on running a plugin it will call a mutate method here to add it to the list.
const mounts = {
  neo4j: { plugin: 'neo4j', url: 'http://localhost:4101' },
  bookmarks: { plugin: 'bookmarks', url: 'http://localhost:4103' },
}

// define queries, eg "bookmarks(subquery: String): JSON".
// these just pass along a graphql query to the given mount.
// each query just resolves to a JSON object
const queries = Object.keys(mounts)
  .map(mountKey => `${mountKey}(subquery: String): JSON`)
  .join('\n')

// define schema / type defs
const typeDefs = gql`
  scalar JSON
  type Query {
    ${queries}
  }
`

// define the query resolver for each mount point.
// each takes (parent, args, context, info), fetches data from the
// mounted graphql server, and returns the result as json.
const Query = {}
for (const [mountKey, mount] of Object.entries(mounts)) {
  const resolver = async (parent, args, context, info) => {
    const body = { query: args.subquery } // the graphql query
    const response = await fetch(mount.url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
    const json = await response.json() // convert result to json object
    return json
  }
  Query[mountKey] = resolver
}

// define resolvers
const resolvers = {
  JSON: GraphQLJSON,
  Query,
}

// make apollo server
const server = new ApolloServer({ typeDefs, resolvers })

// start the server
//. pass port as option
server.listen({ port: 4100 }).then(({ url }) => {
  console.log(`GraphQL neomem server ready at ${url}`)
})
