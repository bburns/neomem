import test from 'ava'
import { Action } from '../src/action'

test(`look`, async t => {
  const action = Action.make('look')
  t.deepEqual(action.str, 'look')
})

test(`look bat`, async t => {
  const action = Action.make('look bat')
  t.deepEqual(action.str, 'look bat')
  t.deepEqual(action.tokens, ['look', 'bat'])
})
