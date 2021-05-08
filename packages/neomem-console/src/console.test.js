import test from 'ava'
import { makeConsole } from './console.js'

const print = console.log
const evaluate = makeConsole()
const evaluate2 = makeConsole()

test(`pok`, async t => {
  const { output } = await evaluate('pok')
  t.deepEqual(output, 'huh?')
})

test(`look`, async t => {
  const { output } = await evaluate('look')
  t.deepEqual(output, 'i see /')
})

// make sure can handle two consoles at once (no singleton)
test(`go chrome + books`, async t => {
  const { output } = await evaluate('go chrome')
  const { output: output2 } = await evaluate2('go books')
  t.deepEqual(output, 'Went to chrome')
  t.deepEqual(output2, 'Went to books')
})

test(`go + look`, async t => {
  let { context } = await evaluate('go chrome')
  let { output } = await evaluate('look', context)
  t.deepEqual(output, 'i see chrome')
})
