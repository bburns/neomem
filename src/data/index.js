;({
  meta: {
    name: 'home',
    notes: 'main skeleton for neomem',
    initialLocation: 'home',
    metafile: 'home-meta.js',
  },
  nodes: [
    {
      _id: 'home',
      name: 'home',
      type: 'folder',
      notes: 'neomem skeleton',
    },
    {
      _id: 'filesys',
      name: 'filesys',
      type: 'mount',
      driver: 'filesys',
      source: '.',
    },
    {
      _id: 'forest',
      name: 'forest',
      type: 'mount',
      driver: 'jsonTimegraph',
      source: 'src/data/forest.js',
    },
    {
      _id: 'pg',
      name: 'pg',
      type: 'mount',
      driver: 'postgres',
      source: 'neomem',
    },
    {
      _id: 'blog',
      name: 'blog',
      type: 'mount',
      driver: 'filesys',
      source: 'src/data/blog',
    },
    {
      _id: 'house',
      name: 'house',
      type: 'mount',
      driver: 'jsonTimegraph',
      source: 'src/data/house.js',
    },
    {
      _id: 'gsheet',
      name: 'gsheet',
      type: 'mount',
      driver: 'gsheet',
    },
    {
      _id: 'notes',
      name: 'notes',
      type: 'mount',
      driver: 'filesys',
      source: '/Users/bburns/Dropbox/@Notebook',
    },
    {
      _id: 'test',
      name: 'test',
      type: 'mount',
      driver: 'orgmode',
      source: '/Users/bburns/Desktop/test.org',
    },
  ],
  edges: [
    { _from: 'home', _to: 'filesys', type: 'contains' },
    { _from: 'home', _to: 'blog', type: 'contains' },
    // { _from: 'home', _to: 'pg', type: 'contains' },
    { _from: 'home', _to: 'forest', type: 'contains' },
    { _from: 'home', _to: 'house', type: 'contains' },
    // { _from: 'home', _to: 'gsheet', type: 'contains' },
    { _from: 'home', _to: 'notes', type: 'contains' },
    { _from: 'home', _to: 'test', type: 'contains' },
  ],
})