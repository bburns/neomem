import R from 'rambda'
import { data } from './data.js'

const output = console.log

const { nodes } = data

//. later do some kind of query with pagination

function outputPage(nodes) {
  output(`<div class="page">`)
  outputBlog(nodes)
  output(`</div>`)
}

function outputBlog(nodes) {
  output(`<div class="blog">`)
  R.forEach(outputPost, posts)
  output(`</div>`)
}

function outputPost(node) {
  output(`<div class="post">`)
  output(`<div class="name">${node.name}</div>`)
  output(`<div class="created">${node.created}</div>`)
  output(`<div class="notes">${node.notes || ''}</div>`)
  output(`</div>`)
}

const posts = R.filter(
  // @ts-ignore
  node => node.type === 'post' && node.public,
  nodes
)

outputPage(posts)
