import test from 'ava'
import * as domain from '../src/index'

let nodes = {}
let node
const plecy = Object.freeze({ _id: 1, name: 'plecy' })

test(`domain`, async t => {

  nodes = domain.addNode(plecy, nodes)
  t.deepEqual(nodes, { 1: plecy } )

  node = domain.getNode(1, nodes)
  t.deepEqual(node, plecy)

})
