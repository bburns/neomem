// filesys sim
export const data = {
  nodes: [
    { _id: 1, name: 'home', type: 5 },
    {
      _id: 2,
      name: 'hello.txt',
      type: 6,
      contents: `blahblahblah`,
    },
    { _id: 3, name: 'unlabelled' },
    { _id: 4, name: 'contains', type: 9 },
    { _id: 5, name: 'folder', type: 8, readCommand: 'readDir' },
    { _id: 6, name: 'file', type: 8, readCommand: 'readFile' },
    { _id: 7, name: 'hello.jpg', type: 6, notes: `[jpg image]` },
    { _id: 8, name: 'type', type: 8 },
    { _id: 9, name: 'edge', type: 8 },
  ],
  edges: [
    { _from: 1, _to: 2, type: 4 },
    { _from: 1, _to: 7, type: 4 },
  ],
}
