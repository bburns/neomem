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
    bookmark(id: ID): [Bookmark]!
  }
`

module.exports = typeDefs
