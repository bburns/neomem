// // zork sim
// export const data = {
//   nodes: [
//     { _id: 1, name: 'forest', type: 'place' },
//     { _id: 2, name: 'clearing', type: 'place' },
//     { _id: 3, name: 'south of house', type: 'place' },
//     // meta db - store in separate silo - how? uuids? uids?
//     { _id: 4, name: 'east', type: 'edge', reverse: 5, alias: ['e'] },
//     { _id: 5, name: 'west', type: 'edge', reverse: 4, alias: ['w'] },
//     { _id: 6, name: 'north', type: 'edge', reverse: 7, alias: ['n'] },
//     { _id: 7, name: 'south', type: 'edge', reverse: 6, alias: ['s'] },
//   ],
//   edges: [
//     { _from: 1, _to: 2, direction: 4, type: 'exit' },
//     { _from: 1, _to: 3, direction: 6, type: 'exit' },
//   ],
// }

// filesys sim
export const data = {
  nodes: [
    { _id: 1, name: 'home', type: 5, notes: `the home folder` },
    {
      _id: 2,
      name: 'hello.txt',
      type: 6,
      notes: `a text file`,
      contents: `blahblahblah`,
    },
    { _id: 3, name: 'unlabelled' },
    { _id: 4, name: 'contains', type: 9 },
    { _id: 5, name: 'folder', type: 8, contentType: 11 },
    { _id: 6, name: 'file', type: 8, contentType: 10 },
    { _id: 7, name: 'hello.jpg', type: 6, notes: `[jpg image]` },
    { _id: 8, name: 'type', type: 8 },
    { _id: 9, name: 'edge', type: 8 },
    { _id: 10, name: 'readFile' },
    { _id: 11, name: 'readDir' },
  ],
  edges: [
    { _from: 1, _to: 2, type: 4 },
    { _from: 1, _to: 7, type: 4 },
  ],
}
