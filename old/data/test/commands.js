import test from 'ava'
import neomem from '../src/index.js'


// const config = {
//   uri: 'neo4j://localhost:7688', // port matches that in source-neo4j/scripts/neo4j.sh
// }

test.before('before', async t => {
  await neomem.open()
  t.assert(neomem._source)
})
test.beforeEach('beforeEach', async t=> {
  //. assert that we're using the test db first!
  await neomem._source.runQuery(`match (n) detach delete n`)
})
test.after.always('after.always', async t => {
  await neomem.close()
})


// add, go, back
test(`add path, go path, back`, async t => {
  await neomem.run('add', { path: 'rabbit:animal' })
  await neomem.run('add', { path: 'fox:animal' })
  const { node } = await neomem.run('go', { path: 'rabbit:animal' })
  t.assert(node)
  t.is(node.name, 'rabbit')
  await neomem.run('go', { path: 'fox:animal' })
  const location = neomem.getLocation()
  t.is(location.name, 'fox')
  await neomem.run('back')
  const location2 = neomem.getLocation()
  t.is(location2.name, 'rabbit')
})


test(`help`, async t => {
  const { nodes } = await neomem.run('help')
  const names = nodes.map(node=>node.name)
  t.assert(names.includes('help'))
  t.assert(names.includes('look'))
})


test(`list contents of path`, async t => {
  const { node } = await neomem.run('add', { path: 'matrix:movie' })
  // await neomem.run('add', { path: 'keanu:actor', parentPath:'matrix:movie' }) //. not handled yet
  await neomem.run('add', { path: 'keanu:actor', parentUuid: node.uuid })
  const { nodes } = await neomem.run('list', { path: 'matrix:movie' })
  const names = nodes.map(row=>row.name)
  t.assert(names.includes('keanu'))
})


test(`look at path`, async t => {
  const { node } = await neomem.run('add', { path: 'zoey:cat' })
  const { nodes } = await neomem.run('look', { path: 'zoey:cat' })
  t.is(nodes.length, 1)
  t.is(nodes[0].name, "zoey")
  // t.is(nodes[0].type, "cat") //. an array ['Cat','Node'] - how deal with?
})

test(`look at uuid`, async t => {
  const { node } = await neomem.run('add', { path: 'xanadu:city' })
  const { nodes } = await neomem.run('look', { uuid: node.uuid })
  t.is(nodes[0].name, "xanadu")
})


// // save for later
// // test(`look at home:folder/filesys:mount/Desktop`, async t => {
// // })
