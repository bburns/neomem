const commandLineArgs = require('command-line-args')
const commandLineUsage = require('command-line-usage')
const package = require('../package.json')

const optionDefinitions = [
  {
    name: 'port',
    alias: 'p',
    type: Number,
    defaultValue: 4102,
    description: 'The port to use, eg 4102 (default)',
    typeLabel: '<port>',
  },
  // {
  //   name: 'use',
  //   alias: 'u',
  //   type: String,
  //   defaultValue: 'example',
  //   description: `Source to use: 'example' (default) or 'chrome'`,
  // },
  {
    name: 'help',
    alias: 'h',
    type: Boolean,
    description: 'Display this usage guide.',
  },
]

const options = commandLineArgs(optionDefinitions)

if (options.help) {
  const usage = commandLineUsage([
    {
      header: 'Synopsis',
      content: 'Make neo4j data available to Neomem',
    },
    {
      header: 'Example',
      content: 'node src/index.js --port=4112',
    },
    {
      header: 'Options',
      optionList: optionDefinitions,
    },
    {
      header: 'More',
      content: `Version ${package.version}\nProject home: {underline https://github.com/bburns/neomem}`,
    },
  ])
  console.log(usage)
  process.exit(0)
}

module.exports = options
