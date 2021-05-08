import test from 'ava'
import { makeConsole } from './console.js'

const print = console.log

test(`look`, async t => {
  const runner = makeConsole()
  const output = runner('look')
  t.deepEqual(output, 'i see a cardinal')
})

test(`go chrome`, async t => {
  const runner = makeConsole()
  const output = runner('go chrome')
  t.deepEqual(output, 'Went to chrome')
})
