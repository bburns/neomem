// graphql schema

const { gql } = require('apollo-server')

// const types = `Node,Book,Fish`.split(',')

const typeDefs = gql`
  type Node {
    uuid: ID!
    depth: Int
    name: String
    notes: String
    created: String
    modified: String
  }

  type Fish {
    name: String
  }
`

module.exports = typeDefs
