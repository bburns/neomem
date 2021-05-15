import R from 'rambda'
import { data } from '../../neomem-console/src/data.js'

const output = console.log

const { nodes } = data

//. later do some kind of query with pagination

function getPost(post) {
  return `<div class='post'>
<div class='name'>${post.name}</div>
<div class='created'>${post.created}</div>
<div class='notes'>${post.notes || ''}</div>
</div>`
}

function getPage(nodes) {
  return `
<html>
<body>
<div class='page'>
<div class='blog'>
${R.map(getPost, posts).join('\n')}
</div>
</div>
</body>
</html>
`
}

// @ts-ignore
const posts = R.filter(node => node.type === 'post' && node.public, nodes)

// outputPage(posts)
console.log(getPage(posts))
