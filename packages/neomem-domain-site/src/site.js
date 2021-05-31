import { data } from '../../neomem-driver-json/src/data.js'

const print = console.log

const { nodes } = data

function getPost(post) {
  return `<div class='post'>
<div class='name'>${post.props.name}</div>
<div class='created'>${post.props.created}</div>
<div class='notes'>${post.props.notes || ''}</div>
</div>`
}

function getPage(nodes) {
  return `<html>
<body>
<div class='page'>
<div class='blog'>
${posts.map(getPost).join('\n')}
</div>
</div>
</body>
</html>`
}

const posts = nodes
  .filter(node => node.props.type === 'post' && node.props.public)
  .sort((a, b) => a.props.created.localeCompare(b.props.created))

print(getPage(posts))
