// graphql schema

const { gql } = require('apollo-server')

const typeDefs = gql`
  type Node {
    # id: ID!
    uuid: ID!
    depth: Int
    name: String
    description: String
    # type: String
    # url: String
    created: String
    modified: String
  }

  # type Query {
  #   node(path: String, flatten: Boolean, limit: Int = 20): [Node]!
  #   node_by_id(guid: ID): Node
  # }
`

module.exports = typeDefs
