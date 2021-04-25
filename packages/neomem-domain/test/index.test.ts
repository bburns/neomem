import test from 'ava'
import * as domain from '../src/index'

let nodes = []

test(`pok`, async t => {
  nodes = domain.addNode({ name: 'pok' }, nodes)
  // domain.getNode()
  t.deepEqual(nodes, [])
})
