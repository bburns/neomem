// graphql schema

const { gql } = require('apollo-server')

// define the types in the db
const types = `Node,Book,Fish`.split(',')

// define the fields in the db
const fields = `
  uuid: ID!
  depth: Int
  name: String
  notes: String
  created: String
  modified: String
`

// define the graphql schema
const s = types.map(type => `type ${type} {${fields}}`).join('\n')

// parse the schema
const typeDefs = gql(s)

// const typeDefs = gql`
//   type Node {
//     uuid: ID!
//     depth: Int
//     name: String
//     notes: String
//     created: String
//     modified: String
//   }
// `

module.exports = typeDefs
