// graphql schema

const { gql } = require('apollo-server')

const typeDefs = gql`
  type Node {
    id: ID!
    guid: ID!
    name: String
    type: String
    url: String
    date_added: String
    date_modified: String
  }

  type Query {
    node(path: String, flatten: Boolean): [Node]!
    node_by_id(guid: ID): Node
  }
`

module.exports = typeDefs
