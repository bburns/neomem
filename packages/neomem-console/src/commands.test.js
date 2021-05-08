import test from 'ava'
import commands from './commands.js'

test(`look`, async t => {
  const output = commands.look()()
  t.deepEqual(output, 'i see a cardinal')
})
