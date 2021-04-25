// use this to experiment with datamodel - use for testing also

export default {
  nodes: [
    {
      _id: 1,
      name: 'plecy',
      aka: 'plecostomus',
      description: 'a catfish',
      type: 'fish',
    },
    {
      _id: 2,
      name: 'fishes',
      type: 'folder',
    },
    {
      _id: 3,
      name: 'zoey',
      type: 'cat',
    },
  ],
  relations: [
    {
      _from: 1,
      _to: 2,
      type: 'contains',
    },
  ],
}
