import fs from 'fs'
import * as lib from './lib.js'

let pageWidth = 100
let pageHeight = 5

export class Ui {
  constructor(readline) {
    this.readline = readline
    this.nrow = 0
  }

  reset() {
    this.nrow = 0
  }

  async print(data) {
    let lines = []
    if (lib.isObject(data)) {
      lines = Object.keys(data).map(key => {
        const value = data[key]
        return `${key}: ${value}`
      })
    } else if (Array.isArray(data)) {
      lines = data
    } else {
      lines = [data]
    }
    //. split data/str into lines, break at space before pageWidth
    for (let line of lines) {
      console.log(line)
      this.nrow++
      if (this.nrow > pageHeight) {
        process.stdin.write('[more...]')
        await this.getKeypress()
        // getChar()
        // console.log()
        this.readline.clearLine(process.stdout, -1) //nowork?
        this.nrow = 0
      }
    }
  }

  async getKeypress() {
    return new Promise(resolve => {
      var stdin = process.stdin
      stdin.setRawMode(true) // so get each keypress
      // stdin.resume() // resume stdin in the parent process
      // stdin.pause()
      // stdin.setEncoding('utf8')
      // stdin.on('data', buffer => {
      //   // stdin.resume() // resume stdin in the parent process
      //   // stdin.setRawMode(false)
      //   // stdin.on('data', () => {})
      //   resolve(buffer.toString())
      // })
      stdin.once('data', onData)
      function onData(buffer) {
        // console.log('Inside onData')
        // stdin.removeListener('data', onData)
        stdin.setRawMode(false)
        // stdin.resume() // resume stdin in the parent process
        resolve(buffer.toString())
      }
    })
  }
}

// nowork - waits for hit enter
// function getChar() {
//   let buffer = Buffer.alloc(1)
//   fs.readSync(0, buffer, 0, 1, null)
//   return buffer.toString('utf8')
// }

// nowork - returns immediately
// function getChar() {
//   var size = fs.fstatSync(process.stdin.fd).size
//   var buffer = size > 0 ? fs.readSync(process.stdin.fd, size)[0] : ''
//   return buffer.toString()
// }
