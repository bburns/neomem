import R from 'rambda'
import data from '../data/data.js'
// import * as domain from './index.js'

let { nodes, edges } = data

//. we should do some kind of query with pagination

const publicNodes = R.filter(node => node.public, R.values(nodes))

function outputText(node) {
  console.log(node.name)
  console.log(node.created)
  console.log(node.notes || '')
  console.log()
}

R.forEach(outputText, publicNodes)
