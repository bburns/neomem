const test = require('ava').default
const { Metadata } = require('../src/metadata')

test(`pok`, async t => {
  const metadata = await Metadata.get()
  t.deepEqual(metadata.view.fields, 'name,type,description')
})
