// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.

const nodes = [
  {
    id: '841723812838',
    name: 'plecy',
    type: 'fish',
    description: 'plecostomus catfish',
  },
]

module.exports = {
  Query: {
    nodes: () => nodes,
    // books: (obj, args, context, info) => {
    //   console.log(context)
    //   return new Promise((resolve, reject) => {
    //     setTimeout(() => resolve(books), 500)
    //   })
    // },
    // authors: (obj, args, context, info) => authors,
  },
}
