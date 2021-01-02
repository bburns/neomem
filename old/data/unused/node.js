// not used yet

class Node {
  constructor({ name, type, makeSource, params, children }) {
    this.name = name
    this.type = type
    this.makeSource = makeSource
    this.params = params
    this.children = children
  }
  // getName() {
  //   return this.name
  // }
  // getChildren() {
  //   return this.children
  // }
}


export default function makeNode(params) {
  const node = new Node(params)
  return node
}
