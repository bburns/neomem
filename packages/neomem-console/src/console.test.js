import test from 'ava'
import { makeConsole } from './console.js'
import { connect } from './connect.js'
import { data } from './data.js'

const print = console.log
const evaluate = makeConsole()
const evaluate2 = makeConsole()
const connection = connect(data)
const context = { location: 'forest', connection }

test(`pok`, async t => {
  const { output } = await evaluate('pok', context)
  t.deepEqual(output, 'huh?')
})

test(`look`, async t => {
  const { output } = await evaluate('look', context)
  t.deepEqual(output, 'i see forest')
})

// make sure can handle two consoles at once (no singleton)
test(`go chrome + books`, async t => {
  const { output } = await evaluate('go chrome', context)
  const { output: output2 } = await evaluate2('go books', context)
  t.deepEqual(output, 'Went to chrome')
  t.deepEqual(output2, 'Went to books')
})

test(`go + look`, async t => {
  let { context: context2 } = await evaluate('go chrome', context)
  let { output } = await evaluate('look', context2)
  t.deepEqual(output, 'i see chrome')
})
