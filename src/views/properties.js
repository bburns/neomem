// properties view
// used by console look and compare commands

export function properties({ source }) {
  const view = new PropertiesView(source)
  return view
}

class PropertiesView {
  constructor(source) {
    this.source = source
  }

  // get rows of text from objs from datasource.
  // properties go vertically, objects horizontally.
  // can be one object, as with look command, or >1, as with compare cmd.
  //. not getLines? how handle notes property? might be nice to be multiline -
  // ie diff props could have diff heights.
  //. handle spacing - i guess assume monospace
  async *getRows(start, count) {
    //. header may have multiple objs - distinguish by name (instead of 'value')
    const header = ['property', 'value'].join('  |  ')
    yield header
    const line = `-----------------------------------------------`
    yield line
    // get generator of projections for each node
    const objs = await this.source.getObjs(start, count)
    //. make objs a list - find better way
    const objs2 = []
    for await (let obj of objs) {
      objs2.push(obj)
    }
    const { columns } = this.source.meta //. -> properties?
    // iterate down properties (vertically)
    for (const column of columns) {
      const values = []
      // iterate across objects (horizontally)
      for await (let obj of objs2) {
        //. this is all in progress -
        // the value of an object property can be diff types - how handle them all?
        const oc = obj[column]
        if (Array.isArray(oc)) {
          //. return an array? a string?
          const value = oc.map(o => (typeof o === 'object' ? o.props.name : o))
          values.push(value)
        } else if (typeof oc === 'object') {
          values.push(oc.props ? oc.props.name : '??') //.
        } else {
          values.push(oc)
        }
      }
      // yield the row of text
      const str = [column, ...values].join('  |  ')
      yield str
    }
  }
}
