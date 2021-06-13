;({
  meta: {
    name: 'forest',
    notes: 'a world',
    metafile: 'place-meta.js',
    initialPath: 'forest',
  },
  nodes: [
    {
      _id: 'forest',
      name: 'forest',
      type: 'place',
      notes: 'a shady forest of aspen trees',
    },
    { _id: 'clearing', name: 'clearing', type: 'place' },
    { _id: 'field', name: 'field', type: 'place' },
  ],
  edges: [
    {
      _from: 'forest',
      _to: 'clearing',
      direction: 'east',
      type: 'exit',
    },
    { _from: 'forest', _to: 'field', direction: 'north', type: 'exit' },
  ],
})
