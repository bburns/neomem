// run with `yarn test`

import test from 'ava'
import R from 'rambda'
import * as domain from './index.js'
import data from '../data/data.js'

// crud operations with a const item
test(`domain CRUD`, async t => {
  let nodes = {}
  let node
  const plecy = Object.freeze({ _id: 1, name: 'plecy' })

  // create
  nodes = domain.add(plecy, nodes)
  t.deepEqual(nodes, { 1: plecy })

  // retrieve
  node = domain.get(1, nodes)
  t.deepEqual(node, plecy)

  // update
  const prop = 'description'
  const value = 'plecostomus'
  nodes = domain.update(1, prop, value, nodes)
  const plecy2 = { ...plecy, [prop]: value }
  t.deepEqual(nodes, { 1: plecy2 })

  // delete
  nodes = domain.remove(1, nodes)
  t.deepEqual(nodes, {})
})

test(`read from data.js`, async t => {
  const nodes = {}
  R.forEach(item => (nodes[item._id] = item), data.nodes)
  const node = domain.get(1, nodes)
  t.like(node, { _id: 1, name: 'plecy' })
})
