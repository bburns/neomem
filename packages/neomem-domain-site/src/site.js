import { data } from '../../neomem-driver-json/src/data.js'

const print = console.log

const { nodes } = data

const about = `
Neomem is a combination table and document editor, with free and paid hosting plans and a marketplace for plugins.

You can filter, sort, group, and edit data from different sources in the same way - files, bookmarks, email, database, etc.

It's open source and cross-platform. More information at https://github.com/bburns/Neomem.

Development is ongoing, with a launch planned for August 2021.

Follow along on Twitter - https://twitter.com/bburnskm and https://twitter.com/neomem_io.
`
  .trim()
  .replaceAll('\n', '<br/>')

function getPost(post) {
  return `<div class='post'>
<div class='name'><b>${post.props.name}</b></div>
<div class='created'>${post.props.created.slice(0, 10)}</div>
<div class='notes'>${post.props.notes.trim().replaceAll('\n', '<br/>')}</div>
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
${about}
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
  .sort((a, b) => -a.props.created.localeCompare(b.props.created))

print(getPage(posts))
