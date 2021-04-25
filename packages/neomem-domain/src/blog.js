import R from 'rambda'
import data from '../data/data.js'
import * as domain from './index.js'

let { nodes, edges } = data

const publicNodes = R.filter(node => node.public, R.values(nodes))
console.log(publicNodes)

// const getPublic = R.filter(R.prop('public'))
// console.log(getPublic(R.values(nodes)))

function getPost(node) {
  return `${node.name}: ${node.description || '(no description)'}`
}

const posts = R.map(getPost, publicNodes)

function output(post) {
  console.log(post)
  console.log()
}

R.forEach(output, posts)
