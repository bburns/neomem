// use this to experiment with datamodel - use for testing also.
// store nodes and edges.

// _id, _from, _to are from arangodb

//. call these items and relations, as the ui will use?

// consider this the serialized form - the db would read them
// and instantiate the indexes, or store those separately

export const data = {
  nodes: [
    {
      id: 1,
      name: 'plecy',
      alias: 'plecostomus',
      notes: 'a catfish',
      type: 'fish',
      public: true,
      created: '2021-04-25T04:25:00',
      modified: null,
    },
    {
      id: 2,
      name: 'fish',
      type: 'folder',
      created: '2021-04-25T04:25:00',
      modified: null,
    },
    {
      id: 3,
      name: 'zoey',
      type: 'cat',
      created: '2021-04-25T04:25:00',
      modified: null,
    },
    {
      id: 4,
      name: 'default view',
      type: 'view',
      columns: [5],
      created: '2021-04-25T04:25:00',
      modified: null,
    },
    {
      id: 5,
      type: 'column',
      note: 'name',
      created: '2021-04-25T04:25:00',
      modified: null,
    },
    {
      id: 6,
      type: 'column',
      note: 'type',
      created: '2021-04-25T04:25:00',
      modified: null,
    },
    {
      id: 7,
      type: 'column',
      note: 'description',
      created: '2021-04-25T04:25:00',
      modified: null,
    },
    {
      id: 8,
      type: 'field',
      name: 'name',
      display: 'Name',
      created: '2021-04-25T04:25:00',
      modified: null,
    },
    {
      id: 9,
      type: 'field',
      name: 'type',
      display: 'Type',
      created: '2021-04-25T04:25:00',
      modified: null,
    },
    {
      id: 10,
      type: 'field',
      name: 'description',
      display: 'Description',
      created: '2021-04-25T04:25:00',
      modified: null,
    },
    {
      id: 11,
      type: 'blog',
      name: 'neoblog',
      notes: `This is my blog.`,
      public: true,
      created: '2021-04-25T10:25:00',
      modified: null,
    },
    {
      id: 13,
      type: 'column',
      notes: 'notes',
      created: '2021-04-25T14:25:00',
      modified: null,
    },
    {
      id: 14,
      type: 'place',
      name: 'forest',
      notes: 'a dreary forest with faint light filtering from above',
      created: '2021-05-08T14:25:00',
      modified: null,
    },
    {
      id: 15,
      type: 'place',
      name: 'field',
      notes: 'a grassy field stretches out, covered in wildflowers',
      created: '2021-05-08T14:25:00',
      modified: null,
    },
    {
      id: 16,
      name: 'trees',
      created: '2021-05-08T14:25:00',
      modified: null,
    },
    {
      id: 17,
      name: 'leaves',
      created: '2021-05-08T14:25:00',
      modified: null,
    },
    {
      id: 18,
      name: 'a new blog',
      created: '2021-05-15T14:25:00',
      modified: null,
      type: 'post',
      public: true,
      notes: `
Okay, here is my new blog, stored in / generated by Neomem. I'll try to make it look nicer later.

I'm hoping that writing a blog in Neomem will get me to make it functional faster. 

I've been spending weekends lately working on it, but every time I come back to it I think - this is too complex - and try again. Maybe eventually it'll settle on a good architecture. 

Last week I found ArangoDB, which is faster and uses less memory than Neo4j, and I like the query language a bit better. So I'm going to try that for the main storage.

But for now, this is stored in a json file along with other test data. Keeping it as simple as possible for now.`,
    },
    {
      id: 19,
      name: `arangodb`,
      created: '2021-05-16T23:14:00',
      modified: null,
      type: 'post',
      public: true,
      notes: `
I'm trying out ArangoDB in another project - it took a while to figure out how to do a migration to initialize the database. But both of these projects will help with the design of the other. 
`,
    },
  ],

  edges: [
    {
      from: 1,
      to: 2,
      type: 'contains',
      created: '2021-04-25T04:25:00',
      modified: null,
    },
    { from: 5, to: 8, type: 'shows' },
    { from: 6, to: 9, type: 'shows' },
    { from: 7, to: 10, type: 'shows' },
    { from: 14, to: 16, type: 'contains' },
    { from: 14, to: 17, type: 'contains' },
  ],
}
