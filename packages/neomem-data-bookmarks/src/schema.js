// graphql schema

const { gql } = require('apollo-server')

const typeDefs = gql`
  type Bookmark {
    id: ID!
    name: String
    type: String
    description: String
  }

  type Query {
    findOne(id: ID!): Bookmark
    findAll: [Bookmark!]!
  }
`

module.exports = typeDefs
