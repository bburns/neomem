
//. main reason for needing this is for help command, and to export all at once -
// remove if possible.
const commands = {
  add, back, del, go, help, history, list, look, quit, set, trail, undo, unknown, up
}


// add a new item or link between items
//. this could let you add/mount data sources, eventually
// > add link to neo4j/home:folder => prompt for uri, user, pw
// > add link to filesys
// > add fish => 'new fish'
// > add fish plecy => (node:Fish {name:'plecy'})
// > add fish glass and go [there]
// > go home
// > add link [from here] to plecy
// > add link to fish plecy
// > add link to plecy:fish
// > add link to fish with name plecy and size 12in
// > add link to fish {name:plecy, size:12in}
// > go plecy
// > add link from home [to here]
function add(params={}) {
  const { path, parentPath, parentUuid } = params
  async function execute() {
    const ret = await this._source.add({ path, parentPath, parentUuid })
    return ret
  }
  //. how can this undo by deleting a uuid unless the command object stores uuid state?
  // how do that? running execute fn should let it update this object. 
  // not the neomem object. so shouldn't bind the command to neomem. 
  // should instantiate a class as an object? 
  async function undo() {
  }
  return { execute, undo }
}

add.notes = `jnkjnkjnkjn`

class Add {
  constructor(neomem, params={}) {
    this.name = 'add'
    this.neomem = neomem
    this.uuid = null
  }
  execute() {
  }
  undo() {
  }
}



function back() {
  async function execute() {
    return { node: this.popLocationHistory() }
  }
  return { execute }
}

back.notes = `Return to last location.`



// note: delete is reserved / not allowed here
function del(params={}) {
  async function execute() {
    return { msg:`Not allowed here.` }
  }
  return { execute }
}

del.aliases = ['delete']



function go(params={}) {
  async function execute() {
    const { path, uuid } = params
    if (path) {
      const { nodes } = await this._source.get({ path })
      if (nodes.length===1) {
        const node = nodes[0]
        return this.setLocation(node)
      } else if (nodes.length===0) {
        return { msg: `Where is that?` }
      }
      return { msg: `need to disambiguate` }
    } else if (uuid) {
      const nodes = await this._source.get({ uuid })
      if (nodes.length===1) {
        const node = nodes[0]
        return this.setLocation(node)
      } else {
        return { msg:`Where is that?` }
      }
    }
    return { msg: `missing params` }
  }
  async function undo() {
    return this.popLocationHistory()
  }
  return { execute, undo }
}

go.aliases = ['goto']



function help(params) {
  async function execute() {
    const nodes = []
    const keys = Object.keys(commands)
    for (const key of keys) {
      const command = commands[key]
      const node = { name: command.name, aliases: command.aliases, notes: command.notes }
      nodes.push(node)
    }
    return { nodes }
  }
  return { execute }
}


function history() {
  async function execute() {
    return { nodes: this.getCommandHistory() }
  }
  return { execute }
}


// > list // list all children of current location
// > list *:fish // list fish children of current location
// > list :fish // list fish children of current location
// > list ~dragon // list all children with dragon in their name
function list(params={}) {
  async function execute() {
    const { path, uuid } = params
    const source = this._source
    if (path) {
      const params2 = { parentPath: path }
      const ret = await source.get(params2) //. recurse as needed
      return ret
    } else if (uuid) {
      const params2 = { parentUuid: uuid }
      const ret = await source.get(params2)
      return ret
    }
    const location = this.getLocation()
    const params2 = { parentUuid: location.uuid }
    const ret = await source.get(params2)
    return ret
  }
  return { execute }
}


function look(params={}) {
  async function execute() {
    const { path, uuid } = params
    const source = this._source
    if (path) {
      // return await followPath(source, path) //. split path and recurse as needed
      const ret = await source.get({ path })
      return ret
    } else if (uuid) {
      const ret = await source.get({ uuid })
      return ret
    }
    const node = this.getLocation()
    return { nodes: [node] }
  }
  // async function followPath(source, path) {
  //   // console.log('followpath', path)
  //   //. cdr down the path parts to the appropriate source
  //   const parts = path.split('/')
  //   const first = parts[0]
  //   const rest = parts.slice(1)
  //   const nodes = await source.get({ path: first })
  //   if (nodes.length>1) {
  //     //. disambiguate, or fail
  //     return {}
  //   }
  //   const node = nodes[0]
  //   if (rest.length>0) {
  //     // if (node.type.includes('Mount')) {
  //     //   console.log('mount', node.mountType)
  //     //   // source = sources[node.mountType]
  //     // }
  //     return { nodes: await followPath(source, rest.join('/')) }
  //   }
  //   return { nodes }
  // }
  return { execute }
}
// look.aliases = ['l']
// if (types.length===0) {
//   return `Where is that?`
// } else if (types.length===1) {
// } else {
//   // disambiguate - ask which type they mean
//   // eg folder home vs project home vs place home
//   const answer = await ui.question(
//     `Which ${path} did you mean? ${types.join(', ').toLowerCase()}?\n> `,
//     types[0].toLowerCase(),
//     )
//   console.log(answer)
//   // type = utils.capitalize(answer)
//   //. goto top
//   // console.log(type)
// }
//. disambiguate to get one node
// const answer = await ui.question(`Which ${name} do you mean - ${types}?`)
//   // disambiguate - ask which type they mean
//   // eg folder home vs project home vs place home
//   const answer = await ui.question(
//     `Which ${name} did you mean? ${types.join(', ').toLowerCase()}?\n> `,
//     types[0].toLowerCase(),
//     )
//   console.log(answer)
//   // type = utils.capitalize(answer)
//   //. goto top
//   // console.log(type)
// }
// console.log(`Assuming you meant the ${nodes[0].type}...`)
// return nodes[0] //. just return first one for now



function quit(params={}) {
  async function execute() {
    // ui.quit()
  }
  return { execute }
}


function set(params) {
  // async function execute() {}
}


// show trail of location history
//. should include current place as last entry
function trail() {
  async function execute() {
    return { nodes: this.getLocationHistory() }
  }
  return { execute }
}


function undo() {
  async function execute() {
    return { msg: this.undoCommand() }
  }
  return { execute }
}


function unknown() {
  async function execute() {
    return { msg:'What?' }
  }
  return { execute }
}


function up() {
  async function execute() {
    const parent = this.getLocation().parent
    if (parent) {
      return { msg:this.setLocation(parent) }
    }
    return `Already at root.`
  }
  return { execute }
}



export default commands
