// use this to experiment with datamodel - use for testing also

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
      id: 12,
      type: 'post',
      name: `Blog n++`,
      notes: `pok pok pokp okpok pok `,
      public: true,
      created: '2021-04-25T14:25:00',
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
