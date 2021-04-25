import R from 'rambda'
import data from '../data/data.js'
import * as domain from './index.js'

let { nodes, edges } = data
// console.log(nodes)

const publicNodes = R.filter(node => node.public, R.values(nodes))
console.log(publicNodes)
