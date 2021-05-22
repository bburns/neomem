// simple blog generator
// usage: (at top neomem folder)
//   npm run gateway
// (in another terminal)
//   npm run blog && cat docs/index.md

// @ts-nocheck

import fs from 'fs'
// import libpath from 'path'
import fetch from 'node-fetch'
// import R from 'rambda'

const print = console.log

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
const getPosts = posts => posts.map(getPost).join('\n')

// const posts = R.sort(
//   (a, b) => -a.created.localeCompare(b.created),
//   R.filter(node => node.type === 'post' && node.public, nodes)
// )

const posts = nodes
  .filter(node => node.type === 'post' && node.public)
  .sort((a, b) => -a.created.localeCompare(b.created))

// print(getPosts(posts))

// const getIndex = posts => posts.map(post => post.title)

const getFileTitle = post =>
  post.created.slice(0, 10) + '-' + post.name.toLowerCase().replace(/ /g, '-')

let toc = `
## Welcome to the Neomem blog...

`
// posts.forEach(post => {
for (const post of posts) {
  const str = getPost(post)
  const fileTitle = getFileTitle(post)
  // const path = process.cwd() + '/' + outputFolder + '/' + fileTitle + '.md'
  const path = '../../' + outputFolder + '/' + fileTitle + '.md'
  // const fd = fs.openSync(path, 'w')
  // fs.writeStringSync(fd, str)
  fs.writeFileSync(path, str)
  toc += `- [${post.created.slice(0, 10)} ${post.name}](${fileTitle}.md)\n`
}

const path = '../../' + outputFolder + '/index.md'
fs.writeFileSync(path, toc)
