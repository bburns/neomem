// graphql schema

const { gql } = require('apollo-server')

const typeDefs = gql`
  type Node {
    id: ID!
    guid: ID!
    depth: Int
    name: String
    type: String
    url: String
    date_added: String
    date_modified: String
  }

  type Query {
    node(path: String, flatten: Boolean, first: Int = 20): [Node]!
  }
`

module.exports = typeDefs
