import test from 'ava'
import { makeConsole } from './index.js'

const config = {}

test(`pok`, async t => {
  const console = makeConsole(config)
  console.start()
  t.deepEqual(1, 1)
})
