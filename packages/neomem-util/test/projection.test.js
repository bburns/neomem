const test = require('ava')
const { Projection } = require('../src')

test('date1601', t => {
  const item = { date_added: '0' }
  const fields = [
    { key: 'created', source: 'date_added', datatype: 'date1601' },
  ]
  const projection = Projection.make(item, fields)
  t.is(projection.created, '1601-01-01T00:00:00.000Z')
})
