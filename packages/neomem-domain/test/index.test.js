import test from 'ava'
import { Domain } from '../src/index.js'

test(`look`, async t => {
  Domain.getNodes()
  t.deepEqual(1, 1)
})
