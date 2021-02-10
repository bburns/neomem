const test = require('ava')
const { Command } = require('../src/command')

test(`look`, async t => {
  const command = Command.make('look')
  t.deepEqual(command.str, 'look')
})

test(`look bat`, async t => {
  const command = Command.make('look bat')
  t.deepEqual(command.str, 'look bat')
  t.deepEqual(command.tokens, ['look', 'bat'])
})
