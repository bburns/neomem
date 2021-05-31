import R from 'rambda'
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
  return `
<html>
<body>
<div class='page'>
<div class='blog'>
${posts.map(getPost).join('\n')}
</div>
</div>
</body>
</html>
`
}

//. later do some kind of query with pagination
// const posts = R.filter(node => node.type === 'post' && node.public, nodes)
const posts = nodes.filter(
  node => node.props.type === 'post' && node.props.public
)

print(getPage(posts))
