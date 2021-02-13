const test = require('ava').default
const { Data } = require('../src/data')

test(`rew`, async t => {
  const data = await Data.get()
  t.deepEqual(data, undefined)
})

test(`qew`, async t => {
  const query = {}
  const data = await Data.get({ query })
  t.deepEqual(data, undefined)
})
