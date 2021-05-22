// simple blog generator
// usage: (at top neomem folder)
//   npm run gateway
// (in another terminal)
//   npm run blog

// @ts-nocheck - doesn't recognize top level await yet

import fs from 'fs'
import fetch from 'node-fetch'

const print = console.log

const outputFolder = process.argv[process.argv.length - 1]
print(outputFolder)

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

const getPostDate = post => post.created.slice(0, 10)

// get rid of spaces and parens (mess up markdown rendering)
const getFileTitle = post =>
  getPostDate(post) +
  '-' +
  post.name
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[\(\)]/g, '')

const posts = nodes
  .filter(node => node.type === 'post' && node.public)
  .sort((a, b) => -a.created.localeCompare(b.created))

let toc = `
## Welcome to the Neomem blog...
  
`

// write post files
for (const post of posts) {
  const str = getPost(post)
  const fileTitle = getFileTitle(post)
  const path = `../../${outputFolder}/${fileTitle}.md`
  fs.writeFileSync(path, str)
  toc += `- [${getPostDate(post)} ${post.name}](${fileTitle}.md)\n`
}

// write index file
const path = `../../${outputFolder}/index.md`
fs.writeFileSync(path, toc)
