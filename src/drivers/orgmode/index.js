// driver for orgmode text files

import fs from 'fs/promises' // node lib
import { exec, execSync, spawn } from 'child_process' // node lib
import * as libdrivers from '../libdrivers.js'
import tty from 'tty'
// import libpath from 'path' // node lib
// import Termit from 'termit'

export const driver = {
  connect(path) {
    return new DatasourceOrgmode(path)
  },
}

//

class DatasourceOrgmode {
  constructor(path) {
    this.type = 'orgmode'
    this.path = path
    this.initialPath = 0
    this.indexes = { keys: {} } //. or call it {pos}? or leave opaque?
    this.text = null
    this.dirty = true
  }

  // load file and scan for headers, add to indexes
  async load() {
    // load file
    this.text = String(await fs.readFile(this.path))
    const nodes = []

    // scan file for headers
    const text = this.text
    const type = 'header'
    const regex = /^([*]+[ ]+)(.*)$/gm

    // make a match obj for top of file - first line will be the name
    let match = { index: 0, 1: '', 2: text.slice(0, text.indexOf('\n')) }

    do {
      const pos = match.index // start of header
      const length = null
      // const notes = null
      const key = pos
      const indent = match[1].trim() // header asterisks
      const depth = indent.length
      const name = match[2].trim() // header text
      const notesStart = pos + match[1].length + match[2].length + 1

      //. scan text for "prop: value" lines, add to node props
      // i guess for the read view, would just use notes to edit them,
      // but for table view would want to access them as props.
      const propvalues = {}

      const props = {
        key,
        name,
        type,
        depth,
        indent,
        length,
        notesStart,
        ...propvalues,
      }
      const node = new NodeOrgmode(this, props)
      nodes.push(node)

      //.. also want to store graph structure, in this case a tree -
      // have a edges 'table'

      // @ts-ignore
    } while ((match = regex.exec(text)) !== null)

    let lastNode = null
    for (const node of nodes) {
      if (lastNode) {
        lastNode.props.notesEnd = node.props.key
      }
      lastNode = node
    }
    for (const node of nodes) {
      node.props.notes = text.slice(node.props.notesStart, node.props.notesEnd)
    }

    // clear and update indexes
    this.indexes.keys = {}
    for (const node of nodes) {
      this.indexes.keys[node.props.key] = node
    }

    this.dirty = false
  }

  // crud operations

  async get(spec) {
    if (this.dirty) await this.load()
    let key = spec
    if (key === 'initialPath') return this.initialPath
    const node = this.indexes.keys[key]
    return node
  }
  set() {}
  update() {}
  remove() {}
}

//

class NodeOrgmode {
  constructor(datasource, props = {}) {
    this.datasource = datasource
    this.props = props
  }

  getContents() {
    //. i guess this should return the nodes - then caller could do
    // whatever they want with them - eg display .name, use the key, sort, etc
    // const contents = Object.values(this.datasource.indexes.keys).map(
    //   // node => node.props.name
    //   node => node.props.key
    // )
    const nodes = Object.values(this.datasource.indexes.keys)
    return nodes
  }

  // crud operations

  async get(spec) {
    const map = {
      contents: this.getContents,
    }
    return libdrivers.get(this, spec, map)
  }
  async set() {}
  async update() {}
  async remove() {}
  async edit(prop) {
    //. write this.props[prop] to a tempfile, then edit it, save back when done

    //. handle editing part of a file - a subheader, or json item, etc -
    //. get text repr, edit, then parse/insert it

    const shell = 'sh -c '
    // const shell = ''

    // const editor = 'code' // vscode
    // const editor = 'nano'
    // const editor = 'vim'
    const editor = 'micro'
    // const editor = 'open -a TextEdit' // comes with macos

    const path = this.datasource.path
    console.log(`Running '${editor}'...`)

    const cmd = `${shell}${editor} ${path}`

    // // works with textedit, but returns immediately
    // const child = exec(cmd)
    // console.log(child)

    // // works with textedit, but returns immediately
    // // nowork with nano
    // const result = execSync(cmd).toString()
    // console.log({ result })

    // const child = exec(cmd)
    // child.stdin.pipe(process.stdin)
    // child.stdout.pipe(process.stdout)
    // child.on('exit', () => {
    //   console.log('done')
    // })

    // // https://stackoverflow.com/questions/9122282/how-do-i-open-a-terminal-application-from-node-js
    // // process.stdin.setRawMode(true)
    // const child = spawn(editor, [path], { stdio: 'inherit' })
    // child.on('exit', (error, code) => {
    //   // process.stdin.setRawMode(false)
    //   console.log('done')
    // })

    // nowork
    // const options = {
    //   disableOpen: true,
    //   disableSaveAs: true,
    // }
    // const term = new Termit(options)
    // term.init(path)
  }
}
