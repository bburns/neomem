// import utils from '@neomem/utils'
import makeSource from '../src/index.js'
import test from 'ava'


// const config = { rootPath: '../..' } // Neomem folder with subpackages etc
const config = { rootPath: '.' }


const source = makeSource() // neo4j
await source.open(config)


test('get .', async t => {
  const nodes = await source.get({ path: '.' })
  t.is(nodes[0].name, 'neomem-source-filesys')
  t.is(nodes[0].type, 'folder')
})

test('get ..', async t => {
  const nodes = await source.get({ path: '..' })
  t.is(nodes[0].name, 'packages')
  t.is(nodes[0].type, 'folder')
})

test('get README.md', async t => {
  const nodes = await source.get({ path: 'README.md' })
  t.is(nodes[0].name, 'README.md')
  t.is(nodes[0].type, 'file')
})

test('get /Users', async t => {
  const nodes = await source.get({ path: '/Users' })
  t.is(nodes[0].name, 'Users')
  t.is(nodes[0].type, 'folder')
})

test('get parentPath=.', async t => {
  const nodes = await source.get({ parentPath: '.' })
  const names = nodes.map(node=>node.name)
  t.assert(names.includes('README.md'))
  t.assert(names.includes('node_modules'))
})





// // list

// // no path
// test('list', async t => {
//   const cmd = source.getCommand('list', { maxDepth: 0 })
//   const output = await cmd.execute()
//   const names = output.map(row => row.name)
//   t.assert(names.includes('.git'))
// })

// // relative path
// test('list packages', async t => {
//   const cmd = source.getCommand('list', { path: 'packages', maxDepth: 0 })
//   const output = await cmd.execute()
//   const names = output.map(row => row.name)
//   t.assert(names.includes('neomem'))
// })

// // absolute path
// test('list /Users', async t => {
//   const cmd = source.getCommand('list', { path: '/Users', maxDepth: 0 })
//   const output = await cmd.execute()
//   const names = output.map(row => row.name)
//   t.assert(names.includes('bburns'))
// })



// // list recursive

// // no path
// test('list -d1', async t => {
//   const cmd = source.getCommand('list', { maxDepth: 1 })
//   const output = await cmd.execute()
//   const packages = output.find(row => row.name==='packages')
//   const names = packages._children.map(row => row.name)
//   t.assert(names.includes('neomem'))
// })

// // relative path
// test('list packages -d1', async t => {
//   const cmd = source.getCommand('list', { path: 'packages', maxDepth: 1 })
//   const output = await cmd.execute()
//   const packages = output.find(row => row.name==='neomem')
//   const names = packages._children.map(row => row.name)
//   t.assert(names.includes('src'))
// })

// // absolute path
// test('list /Users', async t => {
//   const cmd = source.getCommand('list', { path: '/Users', maxDepth: 0 })
//   const output = await cmd.execute()
//   const names = output.map(row => row.name)
//   t.assert(names.includes('bburns'))
// })


// test.skip('list p*', async t => {
//   const output = await run(t.title)
//   const names = getNames(output)
//   console.log(names)
//   t.assert(names.includes('packages'))
// })

// list /Users/bburns/Desktop/n*


await source.close()
