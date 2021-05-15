import R from 'rambda'
import { data } from './data.js'

const { nodes } = data

//. later do some kind of query with pagination

const posts = R.filter(
  // @ts-ignore
  node => node.type === 'post' && node.public,
  nodes
)

const output = console.log

function outputPost(node) {
  output(`<div class="post">`)
  output(`<div class="name">${node.name}</div>`)
  output(`<div class="created">${node.created}</div>`)
  output(`<div class="notes">${node.notes || ''}</div>`)
  output(`</div>`)
}

output(`<div class="blog">`)
R.forEach(outputPost, posts)
output(`</div>`)
