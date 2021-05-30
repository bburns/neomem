// simple blog generator
//
// usage: (at top neomem folder)
//   npm run gateway
// (in another terminal)
//   npm run blog

// @ts-nocheck - doesn't recognize top level await yet

import fs from 'fs'
import fetch from 'node-fetch'

const outputFolder = process.argv[process.argv.length - 1]

//. do some kind of query with pagination
// const nodes = data.get({ where: { type: 'post', public: true } })

const response = await fetch('http://localhost:4000')
const data = await response.json()
const { nodes } = data

// const getPost = post => `
// ## ${post.name}

// ${post.created}

// ${post.notes || ''}
// `
const getPost = post => `---
title: ${post.name}
date: ${post.created}
featured_image: images/landscape.jpg
---

${post.notes || ''}
`

const getFileDate = post => post.created.slice(0, 10) // get eg '2021-05-22'

// get eg 'a-blog-post'
const getFileTitle = post =>
  post.name
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[\(\)]/g, '') // ditch parens (cancels md to html somehow)
    .replace(/\//g, '-')
    .replace(/[,.]/g, '')

// const getFileName = post => `${getFileDate(post)}-${getFileTitle(post)}.md`
const getFileName = post => getFileTitle(post) + '.md'

// get public posts and sort
const posts = nodes
  .filter(node => node.type === 'post' && node.public)
  .sort((a, b) => -a.created.localeCompare(b.created))

// let toc = `
// ## Welcome to the Neomem blog...
//
//`

// write post files
for (const post of posts) {
  const str = getPost(post)
  const fileName = getFileName(post)
  const path = `../../${outputFolder}/${fileName}`
  fs.writeFileSync(path, str)
  // toc += `- [${getFileDate(post)} ${post.name}](${fileName})\n`
}

// // write index file
// const path = `../../${outputFolder}/index.md`
// fs.writeFileSync(path, toc)
