import R from 'rambda'
import { data } from '../../neomem-console/src/data.js'

const output = console.log

const { nodes } = data

//. later do some kind of query with pagination

function outputPost(node) {
  output(`<div class="post">`)
  output(`<div class="name">${node.name}</div>`)
  output(`<div class="created">${node.created}</div>`)
  output(`<div class="notes">${node.notes || ''}</div>`)
  output(`</div>`)
}

function outputBlog(nodes) {
  output(`<div class="blog">`)
  R.forEach(outputPost, posts)
  output(`</div>`)
}

function outputPage(nodes) {
  output(`<div class="page">`)
  outputBlog(nodes)
  output(`</div>`)
}

// @ts-ignore
const posts = R.filter(node => node.type === 'post' && node.public, nodes)

outputPage(posts)
