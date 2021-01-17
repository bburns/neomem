const commandLineArgs = require('command-line-args')
const commandLineUsage = require('command-line-usage')

const optionDefinitions = [
  {
    name: 'help',
    alias: 'h',
    type: Boolean,
    description: 'Display this usage guide.',
  },
  {
    name: 'port',
    alias: 'p',
    type: Number,
    defaultOption: 3101,
    description: 'The port to use, eg 3101',
    typeLabel: '<port>',
  },
  {
    name: 'use',
    alias: 'u',
    type: String,
    defaultOption: 'chrome',
    description: `Source to use - 'example' or 'chrome'`,
  },
]

const options = commandLineArgs(optionDefinitions)

if (options.help) {
  const usage = commandLineUsage([
    {
      header: 'Example',
      content: 'A simple example demonstrating typical usage.',
    },
    {
      header: 'Options',
      optionList: optionDefinitions,
    },
    {
      content: 'Project home: {underline https://github.com/bburns/neomem}',
    },
  ])
  console.log(usage)
  process.exit(0)
}

module.exports = options
