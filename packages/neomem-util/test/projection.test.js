const test = require('ava').default
const { Projection } = require('../src')

test(`Projection.make - should make empty projection`, async t => {
  const item = { name: 'pok', description: 'lkmlkm' }
  const fields = 'name,description'
  const projection = Projection.make(item, fields)
  t.deepEqual(projection, item)
})
