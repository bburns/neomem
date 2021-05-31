// run with `yarn test`

import test from 'ava'
import * as driver from './index.js'
import { data } from './data.js'

const plecy = Object.freeze({ id: 1, props: { name: 'plecy' } })

// crud operations with a const item

// test(`create`, async t => {
//   let nodes = {}
//   nodes = driver.add(plecy, nodes)
//   t.deepEqual(nodes, { 1: plecy })
// })

test(`retrieve`, async t => {
  let nodes = [plecy]
  let node = driver.get(1, nodes)
  t.deepEqual(node, plecy)
})

// test(`update`, async t => {
//   let nodes = {}
//   const prop = 'description'
//   const value = 'plecostomus'
//   nodes = driver.update(1, prop, value, nodes)
//   const plecy2 = { ...plecy, props: { [prop]: value } }
//   t.deepEqual(nodes, { 1: plecy2 })
// })

// test(`delete`, async t => {
//   let nodes = {}
//   nodes = driver.remove(1, nodes)
//   t.deepEqual(nodes, {})
// })

// test(`read from data.js`, async t => {
//   const nodes = {}
//   data.nodes.forEach(item => (nodes[item.id] = item))
//   const node = driver.get(1, nodes)
//   t.like(node, { id: 1, props: { name: 'plecy' } })
// })
