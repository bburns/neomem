const test = require('ava')
const { Projection } = require('../src')

test('pok', t => {
  const item = { date_added: '1234567890' }
  const fields = [
    { key: 'created', source: 'date_added', datatype: 'date1601' },
  ]
  const types = {}
  const projection = Projection.make(item, fields, types)
  t.deepEqual(projection, {})
})
