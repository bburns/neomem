const test = require('ava')

const { Data } = require('../src')
const { Query } = require('neomem-util')

test('empty get', async t => {
  const json = await Data.get()
  t.deepEqual(json, undefined)
})

test('empty query', async t => {
  const query = {}
  const json = await Data.get(query)
  t.deepEqual(json, {})
})

test('query', async t => {
  const query = Query.make()
  const json = await Data.get(query)
  t.deepEqual(json, {})
})
