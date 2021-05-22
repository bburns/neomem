// simple blog generator
// usage: (at top neomem folder)
//   npm run gateway
// (in another terminal)
//   npm run blog && cat docs/index.md

// @ts-nocheck
import fetch from 'node-fetch'
import R from 'rambda'

const print = console.log

// print(process.argv)
const outputFolder = process.argv[process.argv.length - 1]
print(outputFolder)

// const path = process.env.DATA_PATH || '../../neomem-gateway/src/data.js'
// const { data } = await import('./' + path)
// const { nodes } = data

//. do some kind of query with pagination
// const nodes = data.get({ where: { type: 'post', public: true } })
// const nodes = data.get()

const response = await fetch('http://localhost:4000')
const data = await response.json()
const { nodes } = data

const getPost = post => `
## ${post.name}

${post.created}

${post.notes || ''}
`

// these are all equivalent - what's best?
// const getPosts = posts => R.map(getPost, posts).join('\n')
// const getPosts = posts => R.pipe(R.map(getPost), R.join('\n'))(posts)
// const getPosts = R.pipe(R.map(getPost), R.join('\n'))
// const getPosts = posts => posts.map(getPost).join('\n')

// don't like functional - it's barely readable...
const posts = R.sort(
  (a, b) => -a.created.localeCompare(b.created),
  R.filter(node => node.type === 'post' && node.public, nodes)
)

// print(getPosts(posts))
