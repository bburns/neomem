// apollo bookmarks datasource.
// apollo lets you define datasource and pass them to your resolvers.
// it's not strictly necessary, as you can define the datasource in the resolver files.
// but maybe it helps keep resolver file more concise?

const { DataSource } = require('apollo-datasource')

const path = '~/Library/Application Support/Google/Chrome/Default/Bookmarks'

class BookmarksAPI extends DataSource {
  constructor({ bookmarks }) {
    super()
    this.bookmarks = bookmarks
  }

  // async findOne({ id }) {
  //   return this.bookmarks.get(id)
  // }

  // async findAll() {
  //   return Object.values(this.bookmarks.store)
  // }
}

module.exports = BookmarksAPI
