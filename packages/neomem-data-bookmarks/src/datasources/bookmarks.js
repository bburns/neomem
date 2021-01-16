// apollo bookmarks datasource.
// apollo lets you define datasource and pass them to your resolvers.
// it's not strictly necessary, as you can define the datasource in the resolver files.
// but it helps keep resolver file more concise.

// note: While the REST data source comes with its own built in cache,
// the generic data source does not.

const { DataSource } = require('apollo-datasource')

//. should we open the bookmarks file here? in constructor? or in indexjs?

class BookmarksAPI extends DataSource {
  constructor({ bookmarks }) {
    // this seems to get called many times, so not good to put fileread here
    console.log('bookmarksAPI constructor')
    super()
    this.bookmarks = bookmarks
  }

  async find(options) {
    // return Object.values(this.bookmarks.roots)
    // var data = [{ family: "Fam A", category: "Cat A", products: [{ name: "Name A1", style: "Style A1" }, { name: "Name A2", style: "Style A2" }] }, { family: "Fam B", category: "Cat B", products: [{ name: "Name B1", style: "Style B1" }, { name: "Name B2", style: "Style B2" }] }],
    // const folders = this.bookmarks.roots
    // const flat = folders.flatMap(({ children, ...o }) => children.map(p => ({ ...o, ...p })));
    // return flat
    console.log('find', options)
    const bookmarks = this.bookmarks.roots.bookmark_bar.children
    bookmarks.forEach(bm => (bm.date_added = getISODate(bm.date_added)))
    return bookmarks
  }
}

// note chrome bookmark times are relative to 1601-01-01
// https://www.epochconverter.com/webkit
// convert from 1601-based datestring to iso string
// see https://stackoverflow.com/questions/51343828/how-to-parse-chrome-bookmarks-date-added-value-to-a-date
const dateStart1601 = Date.UTC(1601, 0, 1)
function getISODate(dateString1601) {
  const date = new Date(dateStart1601 + Number(dateString1601) / 1000)
  return date.toISOString()
}

module.exports = BookmarksAPI
