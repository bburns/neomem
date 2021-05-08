import test from 'ava'
import { makeConsole } from './console.js'

const print = console.log

test(`look`, async t => {
  const console = makeConsole()
  const cmd = console('look')
  t.deepEqual(cmd.name, 'look')
})
