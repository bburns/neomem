const dateStart1601 = Date.UTC(1601, 0, 1)

const types = [
  {
    key: 'string',
    type: 'type',
    description: '',
    parse: s => s,
    format: s => s,
  },
  {
    key: 'date1601',
    type: 'type',
    description: '',
    parse: s => {
      if (s) {
        const date = new Date(dateStart1601 + Number(s) / 1000)
        return date.toISOString()
      }
      return ''
    },
    format: date1601 => 'NotYetImplemented',
  },
]

function get() {
  return types
}

module.exports = { get }