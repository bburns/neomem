import test from 'ava'
import { makeConsole } from './console.js'

test(`run`, async t => {
  const cons = makeConsole()
  const cmd = cons()
  t.deepEqual(cmd.name, 'look')
})
