// apollo graphql server

const { ApolloServer } = require('apollo-server')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const BookmarksAPI = require('./datasources/bookmarks')
// const fs = require('fs')
// const JSONStream = require('JSONStream')
const bookmarks = require('./foo.json')

// const path = '~/Library/Application Support/Google/Chrome/Default/Bookmarks'
// const path = './foo.json'
// const stream = fs.createReadStream(filepath, { encoding: 'utf8' })
// const parser = JSONStream.parse('roots.*')

// stream.pipe(parser)
// const objs = []
// parser.on('data', function (obj) {
// console.log(obj) // whatever you will do with each JSON object
// objs.push(obj)
// })

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    bookmarksAPI: new BookmarksAPI({ bookmarks }),
  }),
})

server.listen({ port: 4009 }).then(({ url }) => {
  console.log(`GraphQL json server ready at ${url}`)
})
