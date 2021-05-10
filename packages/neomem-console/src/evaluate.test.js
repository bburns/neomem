import test from 'ava'
import { evaluate } from './evaluate.js'
import { connect } from './driver-json.js' // driver

const data = {
  nodes: [
    { id: 1, name: 'forest', notes: 'gloomy' },
    { id: 2, name: 'field', notes: 'grassy' },
    { id: 3, name: 'pool', notes: 'sunny' },
    { id: 4, name: 'trees' },
    { id: 5, name: 'leaves' },
  ],
  edges: [
    { from: 1, to: 4 },
    { from: 1, to: 5 },
  ],
}

const print = console.log
const connection = connect(data)
const locationId = 1
const context = { locationId, connection }
const context2 = { locationId, connection }

test(`pok`, async t => {
  const { output } = await evaluate('pok', context)
  t.deepEqual(output, 'huh?')
})

test(`look`, async t => {
  const { output } = await evaluate('look', context)
  t.deepEqual(output, 'forest\ngloomy')
})

test(`list`, async t => {
  const { output } = await evaluate('list', context)
  t.deepEqual(output, 'trees, leaves')
})

test(`look field`, async t => {
  const { output } = await evaluate('look field', context)
  t.deepEqual(output, 'field\ngrassy')
})

// make sure can handle two consoles at once (no singleton)
test(`go field + pool`, async t => {
  const { output } = await evaluate('go field', context)
  const { output: output2 } = await evaluate('go pool', context2)
  t.deepEqual(output, 'Went to field')
  t.deepEqual(output2, 'Went to pool')
})

test(`go + look`, async t => {
  let { context: context2 } = await evaluate('go field', context)
  let { output } = await evaluate('look', context2)
  t.deepEqual(output, 'field\ngrassy')
})
