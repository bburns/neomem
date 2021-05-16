// simple blog generator
// usage: (at top neomem folder)
//   npm run blog

// @ts-nocheck
import R from 'rambda'

const print = console.log

const path = process.env.DATA_PATH || '../../neomem-gateway/src/data.js'
const { data } = await import('./' + path)
const { nodes } = data

//. do some kind of query with pagination
// const nodes = data.get({ where: { type: 'post', public: true } })
// const nodes = data.get()

const getPost = post => `
## ${post.name}

${post.created}

${post.notes || ''}
`

// these are all equivalent - what's best?
// const getPosts = posts => R.map(getPost, posts).join('\n')
// const getPosts = posts => R.pipe(R.map(getPost), R.join('\n'))(posts)
// const getPosts = R.pipe(R.map(getPost), R.join('\n'))
const getPosts = posts => posts.map(getPost).join('\n')

const posts = R.filter(node => node.type === 'post' && node.public, nodes)

print(getPosts(posts))
