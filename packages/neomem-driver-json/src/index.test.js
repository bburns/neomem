// run with `yarn test`

import test from 'ava'
import * as driver from './index.js'

const plecy = Object.freeze({ id: 1, props: { name: 'plecy' } })

// crud operations

test(`create`, async t => {
  driver.clear()
  driver.add(plecy)
  t.deepEqual(driver.get(1), plecy)
})

test(`retrieve`, async t => {
  driver.clear()
  t.deepEqual(driver.get(1), undefined)
  driver.add(plecy)
  t.deepEqual(driver.get(1), plecy)
})

test(`update`, async t => {
  driver.clear()
  driver.add(plecy)
  const prop = 'notes'
  const value = 'plecostomus'
  driver.update(1, prop, value)
  const plecy2 = { ...plecy, props: { ...plecy.props, [prop]: value } } //. yuck
  t.deepEqual(driver.get(1), plecy2)
})

test(`delete`, async t => {
  driver.clear()
  driver.add(plecy)
  t.deepEqual(driver.get(1), plecy)
  driver.remove(1)
  t.deepEqual(driver.get(1), undefined)
})
