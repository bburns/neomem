// run with `yarn test`

import test from 'ava'
import * as driver from './index.js'

const plecy = Object.freeze({ id: 1, props: { name: 'plecy' } })

// crud operations

test(`create`, async t => {
  driver.add(plecy)
  t.deepEqual(driver.get(1), plecy)
})

test(`retrieve`, async t => {
  driver.add(plecy)
  t.deepEqual(driver.get(1), plecy)
})

test(`update`, async t => {
  const prop = 'notes'
  const value = 'plecostomus'
  driver.update(1, prop, value)
  //. yuck
  const plecy2 = { ...plecy, props: { ...plecy.props, [prop]: value } }
  t.deepEqual(driver.get(1), plecy2)
})

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
