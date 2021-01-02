import test from 'ava'
import makeNeomem from '../src/index.js'
import makeParser from '../src/parser/index.js'

// if don't give parser a datasource with an api,
// it can't resolve words to commands and nouns.
// and without a ui it can't disambiguate with user if necessary.

test.before(async t => {
  const neomem = makeNeomem()
  await neomem.open()
  const parser = makeParser(neomem)
  t.context.parser = parser
})


test(`list`, async t => {
  const cmd = await t.context.parser.parse('list')
  t.is(cmd.name, 'list')
})

test(`list root`, async t => {
  const cmd = await t.context.parser.parse('list root')
  t.is(cmd.name, 'list')
  // console.log(cmd.execute)
})

