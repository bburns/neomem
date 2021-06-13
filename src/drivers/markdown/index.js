// driver for markdown text files

//. this is similar to orgmode, but with different header markers,
// semantics for notes area, frontmatter, properties, etc.
// also might want our own textfile format eventually,
// with significant whitespace, prop:values, wikilinks, etc.
// so will need some base textfile handler classes.

import fs from 'fs/promises'

export const driver = {
  connect() {
    return new DatasourceMarkdown()
  },
}

class DatasourceMarkdown {
  constructor(path) {
    this.type = 'markdown'
    this.path = path
    this.initialPath = ''
    this.text = null
  }

  async load() {
    this.text = String(await fs.readFile(this.path))
  }

  async get(spec) {
    let key = spec
    if (key === 'initialPath') return this.initialPath
    //. scan file for key = header name/text - eventually could have indexes
    const props = { _id: key, name: this.path, notes: this.text }
    return new NodeMarkdown(this, props)
  }
  set() {}
  update() {}
  del() {}
}

//

class NodeMarkdown {
  constructor(datasource, props = {}) {
    this.datasource = datasource
    this.props = props
  }

  getContents() {
    const regex = /^[#]+[ ]+.*$/gm // match header lines
    const contents = []
    let arr
    while ((arr = regex.exec(this.props.notes)) !== null) {
      contents.push(arr[0])
    }
    return contents
  }

  // getNotes() {
  //   return this.props.notes
  // }

  getType() {
    const type = { _id: 'markdown', name: 'markdown' }
    return new NodeMarkdown(this.datasource, type)
  }

  // some props are simple keyvalue items, some are relnships, etc
  async get(prop) {
    const map = {
      contents: this.getContents,
      // notes: this.getNotes,
      type: this.getType,
    }
    const method = map[prop]
    return method ? method.bind(this)() : this.props[prop]
  }
}
