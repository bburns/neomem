import { exec } from 'child_process' // node lib
import chalk from 'chalk' // color text https://github.com/chalk/chalk
import { driver as driverJson } from './driver-json/index.js'
import { driver as driverFilesys } from './driver-filesys/index.js'

const print = console.log

async function edit(connection, key, words) {
  //.
  exec('code pok.txt', (error, stdout, stderr) => {
    print('done')
  })
}

async function go(connection, key, words) {
  //. dest can be adjacent edge name, node name, or abs path, or id
  // eg 'go north', 'go /home', 'go hello.txt', 'go 2', 'go up'
  const dest = words[1]
  key = dest

  // get node of new location
  const node = await connection.get(key)
  const type = await node.get('type')
  const typeName = await type.get('name')

  if (typeName === 'mount') {
    const driverName = await node.get('driver')
    const source = await node.get('source')
    if (driverName === 'json') {
      connection = driverJson.connect()
      await connection.load('./src/' + source)
      key = connection.getInitialLocation()
    } else if (driverName === 'filesys') {
      connection = driverFilesys.connect()
      // key = source
      // key = './src/data/blog' //..
      connection.load('./src/' + source)
      key = '.'
    }
  }

  await look(connection, key, words)
}

async function look(connection, key, words) {
  const node = await connection.get(key)
  const name = await node.get('name')
  const type = await node.get('type')
  const typeName = await type.get('name')
  const notes = await node.get('notes')
  const source = await node.get('source')
  const contents = await node.get('contents')
  const exits = await node.get('exits')

  //. use metadata to determine what props to include
  print(chalk.bold(name))
  if (typeName) print(`type: ${typeName}`)
  if (notes) print(`notes: ${notes}`)
  if (source) print(`source: ${source}`) //. just for mounts
  if (contents && contents.length > 0) print(`contents: ${contents.join(', ')}`)
  if (exits && exits.length > 0) print(`exits: ${exits.join(', ')}`)
}

async function list(connection, key, words) {
  const node = await connection.get(key)
  const name = await node.get('name')
  const contents = await node.get('contents')

  //. use metadata to determine what cols to include, sort, group, etc
  print(chalk.bold(name))
  print(contents.join('\n'))
}

async function unknown(connection, key, words) {
  print('Huh?')
}

export const aliases = { l: look }
export const commands = { edit, go, look, list, unknown }
