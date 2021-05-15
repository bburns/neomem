import R from 'rambda'
import { data } from './data.js'

const { nodes } = data

//. later do some kind of query with pagination

const posts = R.filter(
  // @ts-ignore
  node => node.type === 'post' && node.public,
  nodes
)

function outputText(node) {
  console.log(node.name)
  console.log(node.created)
  console.log(node.notes || '')
  console.log()
}

R.forEach(outputText, posts)
