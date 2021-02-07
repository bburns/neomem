// table
// wrapper around a console table display library

// see https://github.com/gajus/table
const { table, getBorderCharacters } = require('table')

module.exports = class Table {
  constructor(columns, items) {
    this.columns = columns
    this.items = items
  }

  toString() {
    const headings = this.columns.map(col => col.name)
    const rows = [headings]

    for (const item of this.items) {
      const row = []
      for (const col of this.columns) {
        if (typeof col.accessor === 'function') {
          row.push(col.accessor(item))
        } else {
          row.push(item[col.accessor])
        }
      }
      rows.push(row)
    }

    const columnOptions = {}
    for (let i = 0; i < this.columns.length; i++) {
      const column = this.columns[i]
      columnOptions[i] = { width: column.width, truncate: column.width }
    }
    const options = {
      columns: columnOptions,
      // singleLine: true,
      border: getBorderCharacters('ramac'),
      drawHorizontalLine: (index, size) =>
        index === 0 || index === 1 || index === size,
    }

    const s = table(rows, options)
    return s
  }
}
