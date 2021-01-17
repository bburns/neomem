// apollo graphql resolvers.
// provide data for each defined type and field.

// note: By keeping resolvers thin as a best practice, you can safely
// refactor your backing logic while reducing the likelihood of breaking your API.
// hence most code is in the datasources.

// note: resolver functions take (parent, args, context, info) as params.

const resolvers = {
  Query: {
    node: (_, args, { dataSources }) => dataSources.bookmarksAPI.find(args),
    node_by_id: (_, args, { dataSources }) =>
      dataSources.bookmarksAPI.find_by_id(args),
  },
  Node: {
    date_added: parent => getISODate(parent.date_added),
    date_modified: parent => getISODate(parent.date_modified),
  },
}

// convert from 1601-based datestring to iso string.
// chrome bookmark times are relative to 1601-01-01.
// from https://stackoverflow.com/questions/51343828/how-to-parse-chrome-bookmarks-date-added-value-to-a-date
const dateStart1601 = Date.UTC(1601, 0, 1)
function getISODate(dateString1601) {
  if (dateString1601) {
    const date = new Date(dateStart1601 + Number(dateString1601) / 1000)
    return date.toISOString()
  }
  return ''
}

module.exports = resolvers
