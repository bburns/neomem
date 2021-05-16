// @ts-nocheck
import R from 'rambda'

const print = console.log

const path = '../../neomem-console/src/data.js'
const { data } = await import(path)
const { nodes } = data

function getPost(post) {
  return `
## ${post.name}

${post.created}

${post.notes || ''}
`
}

function getPosts(posts) {
  return R.map(getPost, posts).join('\n')
}

//. later do some kind of query with pagination
const posts = R.filter(node => node.type === 'post' && node.public, nodes)

print(getPosts(posts))
