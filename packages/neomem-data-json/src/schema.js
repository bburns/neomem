const { gql } = require('apollo-server')

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  type Node {
    id: ID!
    name: String
    type: String
    description: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "nodes" query returns an array of zero or more Nodes.
  type Query {
    info: String!
    get(id: ID): Node
    nodes: [Node!]!
  }

  type Mutation {
    set(id: ID!, description: String): NodeUpdateResponse!
  }

  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type NodeUpdateResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    node: Node
  }
`

module.exports = typeDefs
