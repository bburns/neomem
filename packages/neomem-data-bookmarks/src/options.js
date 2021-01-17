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
    defaultValue: 4101,
    description: 'The port to use, eg 4101 (default)',
    typeLabel: '<port>',
  },
  {
    name: 'use',
    alias: 'u',
    type: String,
    defaultValue: 'example',
    description: `Source to use: 'example' (default) or 'chrome'`,
  },
]

const options = commandLineArgs(optionDefinitions)

if (options.help) {
  const usage = commandLineUsage([
    {
      header: 'Synopsis',
      content: 'Make Chrome bookmarks available to Neomem',
    },
    {
      header: 'Example',
      content: 'node src/index.js --port=4111 --use=chrome',
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
