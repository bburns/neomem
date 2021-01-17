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
    bookmark(path: String, flatten: Boolean): [Bookmark]!
    bookmark_by_pk(guid: ID): Bookmark
  }
`

module.exports = typeDefs
