// import 'dotenv/config.js' // read envars from .env file into process.env
// import utils from '@neomem/utils'
import commands from './commands.js'
import makeSource from './sources.js'
import config from './config.js'


// assumes have test neo4j instance running on port 7688,
// with authentication turned off (no username/pw needed)
// const testConfig = {
//   sourceType: 'neo4j',
//   homePath: 'home:folder',
//   params: {
//     // uri: 'neo4j://localhost:7688',
//     uri: process.env.NEO4J_URI,
//     user: process.env.NEO4J_USER,
//     password: process.env.NEO4J_PASSWORD,
//   }
// }

const rootNode = {
  // name: 'home',
  // type: 'folder',
  sourceType: 'neo4j',
  path: 'home:folder',
}

// const config = {
//   // uri: 'neo4j://localhost:7688',
//   uri: process.env.NEO4J_URI,
//   user: process.env.NEO4J_USER,
//   password: process.env.NEO4J_PASSWORD,
// }


class Neomem {

  // constructor({ config }={ config: testConfig }) {
  constructor() {
    this._commands = commands // object with { add, delete, go, ... }
    this._commandHistory = [] // list of command objects [{ name, execute, undo }, ...]
    this._locationHistory = [] // list of location nodes [{ name, type, notes }, ...]
    this._source = null
    // this._config = config
  }

  async open() {
    this._source = makeSource(rootNode.sourceType) // eg 'neo4j' -> neomem-source-neo4j
    // await this._source.open(this._config.params) // init neo4j driver with login info
    await this._source.open(config) // init neo4j driver with uri and login info
    // await this.run('go', { path: this._config.homePath })
    await this.run('go', { path: rootNode.path })
  }

  async close() {
    await this._source.close()
  }
  

  // commands
  async run(name, params) {
    const cmd = this._getCommand(name, params)
    const output = await this._executeCommand(cmd)
    return output // { msg, node, nodes, etc }
  }

  //. just combine these into run?
  
  // get a command with { name, execute, undo }
  _getCommand(name, params) {
    const factory = this._commands[name] || this._commands["unknown"]
    const cmd = factory && factory(params)
    cmd.name = name
    return cmd
  }

  // execute a command and put it on the stack
  async _executeCommand(cmd) {
    // bind to this before calling - 
    // then it's like commands are defined here in neomem class.
    const output = await cmd.execute.bind(this)()
    if (cmd.undo) {
      this._commandHistory.push(cmd)
    }
    return output // { msg, node, nodes, etc }
  }

  async undoCommand() {
    const cmd = this._commandHistory.pop()
    const output = await cmd.undo.bind(this)()
    return output
  }

  getCommandHistory() {
    return this._commandHistory
  }


  // locations

  getLocation() {
    return this._locationHistory[this._locationHistory.length-1]
  }

  getLocationHistory() {
    return this._locationHistory
  }

  setLocation(node) {
    this._locationHistory.push(node)
    return { node, msg:`Went to ${node.name}.` }
  }

  popLocationHistory() {
    if (this._locationHistory.length>0) {
      this._locationHistory.pop()
      const node = this.getLocation()
      return { node, msg:`Returned to ${node.name}.` }
    }
    return { msg:`No more backs.` }
  }

  // //. search for place in context AND children AND location history
  // //. recurse
  // findLocation(path, item) {
  //   const [name, type] = utils.getLastNameTypeFromPath(path)
  //   for (const child of item._children || []) {
  //     if (child.name === name) {
  //       return child
  //     }
  //   }
  // }

}


// export default function makeNeomem(params) {
//   return new Neomem(params)
// }

export default new Neomem()
