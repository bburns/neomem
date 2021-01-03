const Conf = require('conf')

const mocks = process.env.NODE_ENV === 'test'

const config = new Conf()
config.set('unicorn', 'foooo')
console.log(config.get('unicorn'))
console.log(config.path)

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