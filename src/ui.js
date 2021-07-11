import fs from 'fs'
import * as lib from './lib.js'

export class Ui {
  constructor(readline) {
    this.readline = readline
    this.nline = 0
    this.pageHeight = 5
    this.pageWidth = 100
  }

  reset() {
    this.nline = 0
  }

  // print is the ui fn that pulls data from the view and hence
  // from the source and hence from the driver and the actual data.
  // data can be a string, array, object - print will chop it up into rows,
  // convert row to string, then chop the string into lines, and print one by one.
  // if reach height of page, prints [more] and waits for keypress (buggy now).
  //. keypress can be a command - p(rev), n(ext), f(irst), l(ast) - (or do like `less`)
  async print(data = '') {
    // split data into rows
    let rows = []
    if (lib.isObject(data)) {
      rows = Object.keys(data).map(key => {
        const value = data[key]
        return `${key}: ${value}`
      })
    } else if (Array.isArray(data)) {
      rows = data
    } else {
      rows = [data]
    }
    //. convert rows to strings, chop strs into lines - break at space before pageWidth.
    const lines = rows //. just do this for now

    // print lines one by one, pausing when reach page height.
    // handle commands, including q for stopping output.
    let cmd = 'next'
    for (let line of lines) {
      console.log(line)
      this.nline++
      if (this.nline > this.pageHeight) {
        process.stdin.write('[more...]')
        const key = await this.getKeypress() //. needs to eat the key
        // this.readline.clearLine(process.stdout, -1) //. nowork
        this.nline = 0 // reset the counter
        //. handle commands - p,n,f,l,q etc - how do? ie jump around data source?
        if (key === 'q') {
          cmd = 'quit'
          break
        }
      }
    }
    return cmd
  }

  //. this doesn't quite work - it echos the character and doesn't erase the [more] - fix
  async getKeypress() {
    return new Promise(resolve => {
      var stdin = process.stdin
      stdin.setRawMode(true) // so get each keypress
      stdin.resume() // resume stdin in the parent process (??)
      // stdin.pause() // doing this causes process to exit
      // stdin.setEncoding('utf8')
      // stdin.on('data', buffer => {
      //   // stdin.resume() // resume stdin in the parent process
      //   // stdin.setRawMode(false)
      //   // stdin.on('data', () => {})
      //   resolve(buffer.toString())
      // })
      stdin.once('data', onData) // once is like on but removes listener afterwards
      function onData(buffer) {
        //. need stdin to eat the character now somehow, as it ends up in the input line
        // getChar() // error - readsync unavailable
        // console.log('Inside onData')
        stdin.setRawMode(false)
        console.log()
        // stdin.resume() // resume stdin in the parent process
        // stdin.pause() // causes process to exit
        resolve(buffer.toString())
      }
    })
  }

  // printView is in charge of fetching data by page/rownum
  // and letting user jump around the data with kbd cmds.
  async printView(view) {
    let start = 0
    let cmd = null
    //. fix this loop - confusing
    top: while (cmd !== 'quit') {
      let count = this.pageHeight //. this could change if user resizes screen
      // fetch data in rows of text - returns iterator over each page
      const rows = await view.getRows(start, count) // get generator/iterator
      for await (let row of rows) {
        cmd = await this.print(row) //. will break rows into lines and print each
        if (cmd === 'quit') {
          break top
        } else if (cmd === 'first') {
          start = 0
          break
        }
      }
      // start += count
      cmd = 'quit'
    }
  }
}

// // nowork - waits for hit enter
// function getChar() {
//   let buffer = Buffer.alloc(1)
//   fs.readSync(0, buffer, 0, 1, null)
//   return buffer.toString('utf8')
// }

// // nowork - returns immediately
// function getChars() {
//   var size = fs.fstatSync(process.stdin.fd).size
//   var buffer = size > 0 ? fs.readSync(process.stdin.fd, size)[0] : ''
//   return buffer.toString()
// }
