import { data } from '../../neomem-driver-json/src/data.js'

const print = console.log

const { nodes } = data

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
<style>
.title {
  font-size: 2em;
  margin-bottom: 1em;
}
.post {
  margin-bottom: 2em;
}
</style>
</head>
<body>
<div class='page'>
<div class='title'>Neomem Blog</div>
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
