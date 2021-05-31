// site/blog generator
// npm run build

import { data } from '../../neomem-driver-json/src/data.js'
import marked from 'marked'

const print = console.log

const { nodes } = data

//. get from blog node
const about = `
Neomem is a combination table and document editor, with free and paid hosting plans and a marketplace for plugins.

You can filter, sort, group, and edit data from different sources in the same way - files, bookmarks, email, database, etc.

It's open source and cross-platform. More information at https://github.com/bburns/Neomem.

Development is ongoing, with a launch planned for August 2021.

Follow along on Twitter - https://twitter.com/bburnskm and https://twitter.com/neomem_io.

Note: this site is generated in Neomem - will make it look nicer later...

----
`

function getPost(post) {
  return `<div class='post'>
<div class='name'><b>${post.name}</b></div>
<div class='created'>${post.created.slice(0, 10)}</div>
<div class='notes'>${marked(post.props.notes)}</div>
</div>`
}

function getPage(nodes) {
  return `<!doctype html>
<html>
<head>
<title>Neomem.io</title>
<style>
.title {
  font-size: 2em;
}
.about {
  margin-bottom: 1em;
}
.post {
  margin-bottom: 2em;
}
</style>
</head>
<body>
<div class='page'>
<div class='title'>Neomem</div>
<div class='about'>
${marked(about)}
</div>
<div class='blog'>
${posts.map(getPost).join('\n')}
</div>
</div>
</body>
</html>`
}

const posts = nodes
  .filter(node => node.props.type === 'post' && node.props.public)
  .sort((a, b) => -a.created.localeCompare(b.created))

print(getPage(posts))
