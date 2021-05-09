import test from 'ava'
import { makeConsole } from './console.js'
import { connect } from './connect.js' // driver

const data = {
  nodes: [{ _id: 1, name: 'forest', notes: 'gloomy' }],
}

const print = console.log
const evaluate = makeConsole()
const evaluate2 = makeConsole()
const connection = connect(data)
// const context = { location: 'forest', connection }
// const location = { id: 1, name: 'forest' } //. duplication - better to store id and look it up
const locationId = 1
const context = { locationId, connection }

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
  t.deepEqual(output, 'field')
})

// make sure can handle two consoles at once (no singleton)
test(`go chrome + books`, async t => {
  const { output } = await evaluate('go chrome', context)
  const { output: output2 } = await evaluate2('go books', context)
  t.deepEqual(output, 'Went to chrome')
  t.deepEqual(output2, 'Went to books')
})

// test(`go + look`, async t => {
//   let { context: context2 } = await evaluate('go chrome', context)
//   let { output } = await evaluate('look', context2)
//   t.deepEqual(output, 'chrome')
// })
