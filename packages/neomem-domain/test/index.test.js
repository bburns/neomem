import test from 'ava'
import { Domain } from '../dist/index.js'

test(`look`, async t => {
  Domain.getNodes()
  t.deepEqual(1, 1)
})
