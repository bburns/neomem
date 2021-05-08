import test from 'ava'
import commands from './commands.js'

test(`look`, async t => {
  const output = await commands.look()()
  t.deepEqual(output, { output: 'i see a cardinal', context: undefined })
})
