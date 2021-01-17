const { table, getBorderCharacters } = require('table')

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
        row.push(obj[col.accessor])
      }
      rows.push(row)
    }
    //   '-'.repeat(obj.depth) + obj.name,
    const cols = {}
    for (let i = 0; i < this.columns.length; i++) {
      const column = this.columns[i]
      cols[i] = { width: column.width, truncate: column.width }
    }
    const options = {
      // columnDefault: {
      //   width: 20,
      //   truncate: 20,
      // },
      // columns: {
      //   0: { width: 36, truncate: 36 },
      //   1: { width: 8, truncate: 8 },
      //   2: { width: 30, truncate: 30 },
      // },
      columns: cols,
      // singleLine: true,
      border: getBorderCharacters(`ramac`),
      drawHorizontalLine: (index, size) =>
        index === 0 || index === 1 || index === size,
    }
    const s = table(rows, options)
    return s
  }
}

module.exports = Table
