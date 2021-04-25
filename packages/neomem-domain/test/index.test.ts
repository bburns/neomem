import test from 'ava'
import * as Domain from '../src/index'

test(`look`, async t => {
  t.truthy(Domain.getNodes('pok'))
  t.deepEqual(1, 1)
})
