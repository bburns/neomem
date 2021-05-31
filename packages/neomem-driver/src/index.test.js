// run with `yarn test`

import test from 'ava'
import { driver } from './index.js'

const plecy = Object.freeze({ _id: 1, props: { name: 'plecy' } })

const connection = driver.connect()

// crud operations

test(`create`, async t => {
  connection.clear()
  connection.add(plecy)
  t.deepEqual(connection.get(1), plecy)
})

test(`retrieve`, async t => {
  connection.clear()
  t.deepEqual(connection.get(1), undefined)
  connection.add(plecy)
  t.deepEqual(connection.get(1), plecy)
})

test(`update`, async t => {
  connection.clear()
  connection.add(plecy)
  const prop = 'notes'
  const value = 'plecostomus'
  connection.update(1, prop, value)
  const plecy2 = { ...plecy, props: { ...plecy.props, [prop]: value } } //. yuck
  t.deepEqual(connection.get(1), plecy2)
})

test(`delete`, async t => {
  connection.clear()
  connection.add(plecy)
  t.deepEqual(connection.get(1), plecy)
  connection.remove(1)
  t.deepEqual(connection.get(1), undefined)
})
