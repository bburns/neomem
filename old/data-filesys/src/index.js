import nodefs from 'fs' // node-only
import nodepath from 'path' // node-only
import moment from 'moment'
import * as lib from './lib.js'


class Source {

  constructor() {
    this.name = 'filesys'
    this.root = null
  }

  async open(config) {
    console.log("Initialize filesys", config)
    this.root = { path: config.rootPath }
  }
  
  async close() {
    console.log("Close filesys")
  }

  async runQuery(queryName, params) {
    if (!fs.statSync) return // fs not avail for react //. will need http interface for api calls
    const query = queries[queryName]
    let result
    try {
      result = await query(params)
    } catch(error) {
      console.error(error)
    }
    return result
  }


  // crud operations - add, get, set, delete
  
  async add({ ui, words }) {
    const type = words[1]
    const name = words[2]
    //. handle notes as third clause - 
    //  write as file contents if type is file, else error
    const path = this.location.path + '/' + name
    if (type==='file') {
      // open and close the file - 'wx' means don't touch it if it exists
      fs.closeSync(fs.openSync(path, 'wx')) 
    } else if (type==='folder') {
      fs.mkdirSync(path)
    } else if (type==='link') {
      console.log(`Links not handled yet.`)
    } else {
      console.log(`Unknown type ${type} - file, folder, and link supported.`)
    }
  }
  
  
  async delete({ ui, words }) {
    //. disambiguate if necessary
    //. could have adjectives for nouns - type, color, size
    const name = words[1]
    const path = this.location.path + '/' + name

    let stats
    try {
      stats = fs.statSync(path)
    } catch(error) {
      console.log(`Where is that?`)
      return
    }

    const type = lib.getType(stats)
    const yes = await ui.confirm(`Are you sure you want to delete the ${type} ${path}?\n> `)
    if (yes) {
      if (type==='file') {
        //. use unlink(path, err => { if (err) throw err else cl(`deleted`)})
        fs.unlinkSync(path)
      } else if (type==='folder') {
        fs.rmdirSync(path)
      } else if (type==='link') {
        fs.unlinkSync(path)
      } else {
        console.log(`Unsure how to remove that item.`)
        return
      }
      return `Deleted ${type} ${name}.`
    }
  }
  // del.aliases = ['delete']
  
  
  // async getNode(path) {
  //   // // recurse down the path parts to find given node
  //   // const firstName = pathObj.getFirstName()
  //   // if (this.root.name === firstName) {
  //   //   if (pathObj.getRest().length === 0) {
  //   //     return this.root
  //   //   }
  //   // }
  //   // for (const child of this.root.children) {
  //   //   return child.source.getNode(pathObj.getRestAsPath()) // recurse
  //   // }
  //   // return null
  // }


  //. handle recursion
  async get(params = { maxDepth:1 }) {

    if (params.path) {

      const path = nodepath.resolve(params.path) // resolves ., .., / etc
      const stats = nodefs.statSync(path)
      const size = stats.size
      const name = nodepath.basename(path) // get last part of filepath
      const type = stats.isDirectory() ? 'folder' : stats.isFile() ? 'file' : 
        stats.isSymbolicLink() ? 'link' : 'other'
      const created = moment(stats.birthtimeMs).format("YYYY-MM-DD hh:mma")
      const modified = moment(stats.ctimeMs).format("YYYY-MM-DD hh:mma") // 'c' for changed
      const row = { name, type, size, created, modified }
      return [row]

    } else if (params.parentPath) {

      const path = nodepath.resolve(params.parentPath) // resolves ., .., / etc
      console.log(path)
      const rows = []
      let dirents
      try {
        dirents = nodefs.opendirSync(path)
      } catch (error) {
        console.error(error)
        return
      }
      for await (const dirent of dirents) {
        const name = dirent.name
        const row = { name }
        // const childpath = path + '/' + name
    //     // recurse if needed
    //     if (maxDepth>0 && row.type === 'folder') {
        // const children = this.list({ ui, words, maxDepth: maxDepth-1, path: childpath })
        // row._children = children
        rows.push(row)
      }
      return rows
    }
  }
  

  //. get file props incl name, notes
  
  // look: (params) => {
  //   const { path } = params
  //   const stats = fs.lstatSync(path)
  //   const type = lib.getType(stats) // eg 'file'
  //   const parts = path.split('/')
  //   const name = parts[parts.length - 1]
  //   const rows = []
  //   rows.push({ name: 'name', value: name })
  //   rows.push({ name: 'type', value: type })
  //   // rows.push({ name: 'path', value: path })
  //   // rows.push({ name: 'contents', value: '5 files' }) //.
  //   return rows
  //   // const isFile = fs.lstatSync(path).isFile()
  //   // if (isFile) {
  //   //   const s = fs.readFileSync(path, 'utf8')
  //   //   return s
  //   // } else {
  //   //   const rows = []
  //   //   rows.push({ name: 'name', value: lastPart })
  //   //   rows.push({ name: 'type', value: 'folder' })
  //   //   rows.push({ name: 'path', value: path })
  //   //   // rows.push({ name: 'contents', value: '5 files' }) //.
  //   //   return rows
  //   // }
  // }


  // path is unique within a filesys device
  look({ rootPath='', path='', ui }) {
    async function execute() {
      const fullPath = path.startsWith('/') ? path : path ? (rootPath + '/' + path) : rootPath
      const rows = await this.runQuery('look', { path: fullPath })
      return rows
    }
    return { execute }
  }
  // look.aliases = ['l']
    
  
  async set({ ui, words }) {
    // const source = ui.location
    // const property = words[1]
    // const target = words[2]
  }

}

export default function makeSource() {
  return new Source()
}
