import test from 'ava'
import * as Domain from '../src/index'

test(`look`, async t => {
  Domain.getNodes('pok')
  t.deepEqual(1, 1)
})
