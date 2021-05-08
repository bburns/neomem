import test from 'ava'
import { makeRunner } from './console.js'

const print = console.log
const runner = makeRunner()

test(`look`, async t => {
  const output = runner('look')
  t.deepEqual(output, 'i see a cardinal')
})

test(`pok`, async t => {
  const output = runner('pok')
  t.deepEqual(output, 'huh?')
})

test(`go chrome`, async t => {
  const output = runner('go chrome')
  t.deepEqual(output, 'Went to chrome')
})
