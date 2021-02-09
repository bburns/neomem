const test = require('ava')
const { Types } = require('../src')

test('keys', t => {
  // t.deepEqual(Object.keys(Types.dict).sort(), ['date1601', 'string'])
  const date1601 = Types.get('date1601')
  t.is(date1601.key, 'date1601')
  t.deepEqual(
    Object.keys(date1601).sort(),
    'description format key parse type'.split(' ')
  )
})
