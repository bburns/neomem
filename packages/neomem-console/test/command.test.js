const test = require('ava')
const { Command } = require('../src/command')

test(`look`, async t => {
  const command = Command.make('look')
  t.deepEqual(command, {
    string: 'look',
    do: _ => _,
    undo: _ => _,
  })
})
