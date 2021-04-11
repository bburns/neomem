const test from 'ava').default
const { Translation } from '../src')

test('date1601', t => {
  const item = { date_added: '0' }
  const fields = [
    { key: 'created', source: 'date_added', datatype: 'date1601' },
  ]
  const translation = Translation.make(item, fields)
  t.is(translation.created, '1601-01-01T00:00:00.000Z')
})
