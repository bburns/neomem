import test from 'ava'
import * as domain from '../src/index'

let nodes = {}
let node
const plecy = Object.freeze({ _id: 1, name: 'plecy' })

test(`domain`, async t => {

  // create
  nodes = domain.add(plecy, nodes)
  t.deepEqual(nodes, { 1: plecy } )

  // retrieve
  node = domain.get(1, nodes)
  t.deepEqual(node, plecy)

  // update
  const prop = 'description'
  const value = 'plecostomus'
  nodes = domain.update(1, prop, value, nodes)
  const plecy2 = { ...plecy, [prop]: value}
  t.deepEqual(nodes, { 1: plecy2})

  // delete
  nodes = domain.remove(1, nodes)
  t.deepEqual(nodes, {} )
})
