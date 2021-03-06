//. does this belong in drivers/json-timegraph folder?
;({
  meta: {
    name: 'home-meta',
    notes: 'metadata for home.js',
  },
  nodes: [
    { _id: 'folder', name: 'folder', type: 'type' },
    { _id: 'mount', name: 'mount', type: 'type' },
    {
      _id: 'contains',
      name: 'contains',
      type: 'edge',
      reverse: 'containedBy',
    },
    { _id: 'unlabelled', name: 'unlabelled' },
    { _id: 'type', name: 'type', type: 'type' },
    { _id: 'edge', name: 'edge', type: 'type' },
    {
      _id: 'containedBy',
      name: 'contained by',
      type: 'edge',
      reverse: 'contains',
    },
  ],
  edges: [],
})
