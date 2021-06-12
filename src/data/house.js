;({
  meta: {
    name: 'house',
    notes: 'another world',
    metafile: 'place-meta.js',
    initialLocation: 1,
  },
  nodes: [
    { _id: 1, name: 'foyer', type: 'place' },
    { _id: 2, name: 'living room', type: 'place' },
    { _id: 3, name: 'kitchen', type: 'place' },
  ],
  edges: [
    { _from: 2, _to: 3, direction: 'west', type: 'exit' },
    { _from: 2, _to: 1, direction: 'south', type: 'exit' },
  ],
})
