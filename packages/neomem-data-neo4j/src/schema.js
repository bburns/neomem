// graphql schema

const { gql } = require('apollo-server')

const typeDefs = gql`
  type Node {
    uuid: ID!
    depth: Int
    name: String
    notes: String
    created: String
    modified: String
  }
`

module.exports = typeDefs
