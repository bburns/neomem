// filesys sim
export const data = {
  nodes: [
    { _id: 1, name: 'home', type: 'm1' },
    { _id: 2, name: 'hello.txt', type: 'm2', contents: `blahblahblah` },
    { _id: 3, name: 'hello.jpg', type: 'm2', notes: `[jpg image]` },
    { _id: 'm1', name: 'folder', type: 'm5', readCommand: 'readDir' },
    { _id: 'm2', name: 'file', type: 'm5', readCommand: 'readFile' },
    { _id: 'm3', name: 'contains', type: 'm6' },
    { _id: 'm4', name: 'unlabelled' },
    { _id: 'm5', name: 'type', type: 'm5' },
    { _id: 'm6', name: 'edge', type: 'm5' },
  ],
  edges: [
    { _from: 1, _to: 2, type: 'm3' },
    { _from: 1, _to: 3, type: 'm3' },
  ],
}
