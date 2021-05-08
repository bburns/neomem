import test from 'ava'
import { makeConsole } from './console.js'

const print = console.log
const evaluator = makeConsole()
const evaluator2 = makeConsole()

test(`look`, async t => {
  const { output } = await evaluator('look')
  t.deepEqual(output, 'i see a cardinal')
})

test(`pok`, async t => {
  const { output } = await evaluator('pok')
  t.deepEqual(output, 'huh?')
})

// make sure can handle two consoles at once (no singleton)
test(`go chrome + books`, async t => {
  const { output } = await evaluator('go chrome')
  const { output: output2 } = await evaluator2('go books')
  t.deepEqual(output, 'Went to chrome')
  t.deepEqual(output2, 'Went to books')
})
