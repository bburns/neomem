import test from 'ava'
import source from '../src/index.js'


//. for some reason this is requiring neo4j to be running locally also at 7687 - why?

const config = {
  uri: 'neo4j://localhost:7688', // port matches that in scripts/neo4j.sh - the docker container
}

// clear and populate test db - this runs once
test.before('before', async t => {
  await source.open(config)
})
// clear db before each test
test.beforeEach('beforeEach', async t => {
  await source.runQuery("match (n) detach delete n")
})
// close db - always runs even if bombs along way
test.after.always('after.always', async t => {
  await source.close()
})


// Add

test(`add by name:type`, async t => {
  const { node } = await source.add({ name: 'zebra', type: 'fish' })
  t.is(node.name, 'zebra')
  await source.delete({ uuid: node.uuid })
  const { nodes } = await source.get({ path: 'zebra:fish' })
  t.is(nodes.length, 0)
})

test(`add by path`, async t => {
  const { node } = await source.add({ path: 'leighann:person' })
  t.is(node.name, 'leighann')
  await source.delete({ uuid: node.uuid })
  const { nodes } = await source.get({ path: 'leighann:person' })
  t.is(nodes.length, 0)
})


// Delete

test(`delete by path`, async t => {
  const { node } = await source.add({ name: 'glass', type: 'fish' })
  t.is(node.name, 'glass')
  await source.delete({ path: 'glass:fish' })
  const { nodes } = await source.get({ path: 'glass:fish' })
  t.is(nodes.length, 0)
})

test(`delete by uuid`, async t => {
  const { node } = await source.add({ name: 'cobra', type: 'fish' })
  t.is(node.name, 'cobra')
  await source.delete({ uuid: node.uuid })
  const { nodes } = await source.get({ path: 'cobra:fish' })
  t.is(nodes.length, 0)
})


// Get

test(`get by path`, async t => {
  const { node:home } = await source.add({ name: 'tasks', type: 'folder' })
  const { nodes } = await source.get({ path: 'tasks:folder' })
  t.is(nodes.length, 1)
  t.is(nodes[0].name, 'tasks')
})

test(`get by uuid`, async t => {
  const { node:home } = await source.add({ name: 'junk', type: 'folder' })
  const { nodes } = await source.get({ path: 'junk:folder' })
  t.is(nodes.length, 1)
  t.is(nodes[0].name, 'junk')
  const uuid = nodes[0].uuid
  const { nodes:nodes2 } = await source.get({ uuid })
  t.is(nodes2.length, 1)
  t.is(nodes2[0].name, 'junk')
})

test(`get by parent path`, async t => {
  const { node:home } = await source.add({ name: 'home', type: 'folder' })
  const { node:inbox } = await source.add({ name: 'inbox', type: 'folder', parentUuid: home.uuid })
  const { nodes } = await source.get({ parentPath: 'home:folder' })
  const names = nodes.map(node=>node.name)
  t.assert(names.includes('inbox'))
})


// Set

test(`set name by uuid; delete it`, async t => {
  const { node } = await source.add({ name: 'john', type: 'person' })
  t.is(node.name, 'john')
  await source.set({ uuid: node.uuid, name: 'jon' })
  const { nodes } = await source.get({ path: 'jon' }) //. note path not name - fix
  const node2 = nodes[0]
  t.is(node2.name, 'jon')
  t.is(nodes.length, 1)
  // t.teardown(async ()=> await source.delete({ uuid: node.uuid }))
})

