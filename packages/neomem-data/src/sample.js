//. could also query each item for description, nitems, etc, if requested?
const items = [
  { name: 'neo4j', type: 'datasource', url: 'http://localhost:4001' },
  { name: 'filesys', type: 'datasource', url: 'http://localhost:4002' },
  {
    name: 'bookmarks',
    type: 'datasource',
    url: 'http://localhost:4003',
    created: '2021-02-02',
  },
]

// the root data item
const root = {
  name: 'neomem-data',
  type: 'datasource',
  description: 'a federated data source',
  created: '2021-02-01',
  children: items,
}

module.exports = root
