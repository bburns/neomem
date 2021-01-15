// apollo bookmarks datasource.
// apollo lets you define datasource and pass them to your resolvers.
// it's not strictly necessary, as you can define the datasource in the resolver files.
// but maybe it helps keep resolver file more concise?

const { DataSource } = require('apollo-datasource')

class BookmarksAPI extends DataSource {
  constructor({ bookmarks }) {
    super()
    this.bookmarks = bookmarks
  }

  // async findOne({ id }) {
  //   return this.bookmarks.get(id)
  // }

  async findAll() {
    // return Object.values(this.bookmarks.roots)
    // var data = [{ family: "Fam A", category: "Cat A", products: [{ name: "Name A1", style: "Style A1" }, { name: "Name A2", style: "Style A2" }] }, { family: "Fam B", category: "Cat B", products: [{ name: "Name B1", style: "Style B1" }, { name: "Name B2", style: "Style B2" }] }],
    // const folders = this.bookmarks.roots
    // const flat = folders.flatMap(({ children, ...o }) => children.map(p => ({ ...o, ...p })));
    // return flat
    const bookmarks = this.bookmarks.roots.bookmark_bar.children
    return bookmarks
  }
}

module.exports = BookmarksAPI
