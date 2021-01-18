// graphql schema

const { gql } = require('apollo-server')

const types = `Node,Book,Fish`.split(',')
const fields = `
  uuid: ID!
  depth: Int
  name: String
  notes: String
  created: String
  modified: String
`
const s = types.map(type => `type ${type} {${fields}}`).join('\n')
console.log(s)
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

//   type Fish {
//     name: String
//   }
// `

module.exports = typeDefs
