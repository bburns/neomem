const test = require('ava').default
const { Http } = require('../src')

test(`make()`, async t => {
  const json = await Http.get('')
  t.like(json, {})
})
