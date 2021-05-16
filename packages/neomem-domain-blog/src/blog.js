// @ts-nocheck
import R from 'rambda'

const print = console.log

const path = process.env.DATA_PATH || '../../neomem-console/src/data.js'
const { data } = await import('./' + path)
const { nodes } = data

const getPost = post => `
## ${post.name}

${post.created}

${post.notes || ''}
`

// const getPosts = posts => R.map(getPost, posts).join('\n')
// const getPosts = posts => R.pipe(R.map(getPost), R.join('\n'))(posts)
// const getPosts = R.pipe(R.map(getPost), R.join('\n'))
const getPosts = posts => posts.map(getPost).join('\n')

//. later do some kind of query with pagination
const posts = R.filter(node => node.type === 'post' && node.public, nodes)

print(getPosts(posts))
