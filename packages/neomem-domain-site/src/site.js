// site/blog generator
// npm run build

import fs from 'fs'
import { data } from '../../neomem-driver-json/src/data.js'
import marked from 'marked'

const templatePath = `./site-vite/templates/index.html`

const warning = `<!-- warning: generated file - do not edit -->`

const print = console.log

const { nodes } = data

//. use a query like get({ name: 'Neomem blog' })
const about = marked(
  nodes.find(node => node.name === 'Neomem blog').props.notes
)

function getPost(post) {
  return `<div class='post'>
<div class='name'>${post.name}</div>
<div class='created'>${post.created.slice(0, 10)}</div>
<div class='notes'>${marked(post.props.notes)}</div>
</div>`
}

//. get nodes via edges from the main blog node
const posts = nodes
  .filter(node => node.props.type === 'post' && node.props.public)
  .sort((a, b) => -a.created.localeCompare(b.created))

const body = `
<body>
<div class='page'>
<div class='title'>Neomem.io</div>
<div class='subtitle'>An open-source information manager</div>
<div class='about'>
${marked(about)}
</div>
<div class='blog'>
${posts.map(getPost).join('\n')}
</div>
</div>
</body>
`.trim()

const template = String(fs.readFileSync(templatePath))
const page = template.replace('{{body}}', body).replace('{{warning}}', warning)

print(page)
