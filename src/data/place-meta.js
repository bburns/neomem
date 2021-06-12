;({
  meta: {
    name: 'places meta file',
    notes: '',
  },
  nodes: [
    {
      _id: 'east',
      name: 'east',
      type: 'edge',
      reverse: 'west',
      alias: ['e'],
    },
    {
      _id: 'west',
      name: 'west',
      type: 'edge',
      reverse: 'east',
      alias: ['w'],
    },
    {
      _id: 'north',
      name: 'north',
      type: 'edge',
      reverse: 'south',
      alias: ['n'],
    },
    {
      _id: 'south',
      name: 'south',
      type: 'edge',
      reverse: 'north',
      alias: ['s'],
    },
    { _id: 'place', name: 'place', type: 'type' },
    { _id: 'exit', name: 'exit', type: 'type' },
  ],
  edges: [],
})
