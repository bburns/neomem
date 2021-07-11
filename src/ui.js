//. make Ui a class, get a ui object

let pageWidth = 100
let pageHeight = 4

export class Ui {
  constructor() {
    this.nrow = 0
  }
  reset() {
    this.nrow = 0
  }
  async print(data) {
    let lines = []
    if (Array.isArray(data)) {
      lines = data
    } else {
      lines = [data]
    }
    // const str = String(data)
    //. split data/str into lines, break at space before pageWidth
    // const lines = [str]
    for (let line of lines) {
      console.log(line)
      this.nrow++
      if (this.nrow > pageHeight) {
        console.log('[more]')
        await getKeypress()
        this.nrow = 0
      }
    }
  }
}

// export const ui = {
//   print,
// }

async function getKeypress() {
  return new Promise(resolve => {
    var stdin = process.stdin
    stdin.setRawMode(true) // so get each keypress
    stdin.resume() // resume stdin in the parent process
    stdin.setEncoding('utf8')
    stdin.on('data', buffer => resolve(buffer.toString()))
  })
}
