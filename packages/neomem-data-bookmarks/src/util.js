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

module.exports = { getISODate }
