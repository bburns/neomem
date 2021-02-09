//. could also query each item for description, nitems, etc, if requested?
const root = {
  name: 'neomem-data',
  type: 'datasource',
  description: 'a federated data source',
  created: '2021-02-01',
  children: [
    { name: 'neo4j', type: 'datasource', url: 'http://localhost:4001' },
    { name: 'filesys', type: 'datasource', url: 'http://localhost:4002' },
    {
      name: 'bookmarks',
      type: 'datasource',
      url: 'http://localhost:4003',
      created: '2021-02-02',
    },
  ],
}

class Root {
  constructor() {
    throw new Error('Use Root.get fn')
  }
  // fetch items - could be from db so make async.
  // could be a memoized fn eg for reading giant bookmarks file.
  static async get() {
    return root
  }
}

module.exports = { Root }
