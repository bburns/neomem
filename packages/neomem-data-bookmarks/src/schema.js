// graphql schema

const { gql } = require('apollo-server')

const typeDefs = gql`
  type Bookmark {
    id: ID!
    guid: ID!
    name: String
    type: String
    url: String
    date_added: String
  }

  type Query {
    # findOne(id: ID!): Bookmark
    findAll: [Bookmark!]!
  }
`

module.exports = typeDefs
