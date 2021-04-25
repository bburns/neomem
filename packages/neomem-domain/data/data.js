// use this to experiment with datamodel - use for testing also

//. call these items and relations, as the ui will use?

//. use arrays? consider this the serialized form - the db would read them
// and instantiate the indexes, or store those separately?

export default {
  nodes: {
    1: {
      _id: 1,
      name: 'plecy',
      alias: 'plecostomus',
      notes: 'a catfish',
      type: 'fish',
      public: true,
      created: '2021-04-25T04:25:00',
      modified: null,
    },
    2: {
      _id: 2,
      name: 'fishes',
      type: 'folder',
      created: '2021-04-25T04:25:00',
      modified: null,
    },
    3: {
      _id: 3,
      name: 'zoey',
      type: 'cat',
      created: '2021-04-25T04:25:00',
      modified: null,
    },
    4: {
      _id: 4,
      name: 'default view',
      type: 'view',
      columns: [5],
      created: '2021-04-25T04:25:00',
      modified: null,
    },
    5: {
      _id: 5,
      type: 'column',
      note: 'name',
      created: '2021-04-25T04:25:00',
      modified: null,
    },
    6: {
      _id: 6,
      type: 'column',
      note: 'type',
      created: '2021-04-25T04:25:00',
      modified: null,
    },
    7: {
      _id: 7,
      type: 'column',
      note: 'description',
      created: '2021-04-25T04:25:00',
      modified: null,
    },
    8: {
      _id: 8,
      type: 'field',
      name: 'name',
      display: 'Name',
      created: '2021-04-25T04:25:00',
      modified: null,
    },
    9: {
      _id: 9,
      type: 'field',
      name: 'type',
      display: 'Type',
      created: '2021-04-25T04:25:00',
      modified: null,
    },
    10: {
      _id: 10,
      type: 'field',
      name: 'description',
      display: 'Description',
      created: '2021-04-25T04:25:00',
      modified: null,
    },
    11: {
      _id: 11,
      type: 'blog',
      name: 'neoblog',
      notes: `This is my blog.`,
      public: true,
      created: '2021-04-25T10:25:00',
      modified: null,
    },
    12: {
      _id: 12,
      type: 'post',
      name: `Blog n++`,
      notes: `pok pok pokp okpok pok `,
      public: true,
      created: '2021-04-25T14:25:00',
      modified: null,
    },
    13: {
      _id: 13,
      type: 'column',
      note: 'notes',
      created: '2021-04-25T14:25:00',
      modified: null,
    },
  },

  edges: {
    '1,2': {
      _from: 1,
      _to: 2,
      type: 'contains',
      created: '2021-04-25T04:25:00',
      modified: null,
    },
    '5,8': { _from: 5, _to: 8, type: 'shows' },
    '6,9': { _from: 6, _to: 9, type: 'shows' },
    '7,10': { _from: 7, _to: 10, type: 'shows' },
  },
}
