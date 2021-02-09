const test = require('ava')
const { Types } = require('../src')

const date1601 = Types.get('date1601') // get a type

test('keys', t => {
  t.is(date1601.key, 'date1601')
  t.deepEqual(
    Object.keys(date1601).sort(),
    'description format key parse type'.split(' ')
  )
})

test('conversions', t => {
  t.is(date1601.format('2021-02-09'), 'NotYetImplemented')
  t.is(date1601.parse('0'), '1601-01-01T00:00:00.000Z')
})
