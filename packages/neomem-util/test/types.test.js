const test = require('ava')
const { Types } = require('../src')

test('keys', t => {
  t.deepEqual(Object.keys(Types.dict).sort(), ['date1601', 'string'])
})
