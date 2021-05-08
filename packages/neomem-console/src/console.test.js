import test from 'ava'
import { makeConsole } from './console.js'

const print = console.log
const evaluate = makeConsole()
const evaluate2 = makeConsole()

test(`look`, async t => {
  const { output } = await evaluate('look')
  t.deepEqual(output, 'i see a cardinal')
})

test(`pok`, async t => {
  const { output } = await evaluate('pok')
  t.deepEqual(output, 'huh?')
})

// make sure can handle two consoles at once (no singleton)
test(`go chrome + books`, async t => {
  const { output } = await evaluate('go chrome')
  const { output: output2 } = await evaluate2('go books')
  t.deepEqual(output, 'Went to chrome')
  t.deepEqual(output2, 'Went to books')
})
