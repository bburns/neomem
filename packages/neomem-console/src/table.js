// table
// wrapper around a console table display library

const { table, getBorderCharacters } = require('table') // https://github.com/gajus/table

class Table {
  constructor(columns, objs) {
    this.columns = columns
    this.objs = objs
  }

  toString() {
    const headings = this.columns.map(col => col.name)
    const rows = [headings]

    for (const obj of this.objs) {
      const row = []
      for (const col of this.columns) {
        if (typeof col.accessor === 'function') {
          row.push(col.accessor(obj))
        } else {
          row.push(obj[col.accessor])
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

module.exports = Table
