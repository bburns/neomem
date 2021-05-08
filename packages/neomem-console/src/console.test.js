import test from 'ava'
import { makeConsole } from './console.js'

const print = console.log
const runner = makeConsole()
const runner2 = makeConsole()

test(`look`, async t => {
  const { output } = runner('look')
  t.deepEqual(output, 'i see a cardinal')
})

test(`pok`, async t => {
  const { output } = runner('pok')
  t.deepEqual(output, 'huh?')
})

// make sure can handle two consoles at once (no singleton)
test(`go chrome + books`, async t => {
  const { output } = runner('go chrome')
  const { output: output2 } = runner2('go books')
  t.deepEqual(output, 'Went to chrome')
  t.deepEqual(output2, 'Went to books')
})
