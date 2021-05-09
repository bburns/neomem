import test from 'ava'
import { evaluate } from './evaluate.js'
import { connect } from './driver-json.js' // driver

const data = {
  nodes: [
    { _id: 1, name: 'forest', notes: 'gloomy' },
    { _id: 2, name: 'field', notes: 'grassy' },
    { _id: 3, name: 'pool', notes: 'sunny' },
  ],
}

const print = console.log
// const evaluate = makeConsole()
// const evaluate2 = makeConsole()
const connection = connect(data)
// const context = { location: 'forest', connection }
// const location = { id: 1, name: 'forest' } //. duplication - better to store id and look it up
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

// test(`go + look`, async t => {
//   let { context: context2 } = await evaluate('go chrome', context)
//   let { output } = await evaluate('look', context2)
//   t.deepEqual(output, 'chrome')
// })
