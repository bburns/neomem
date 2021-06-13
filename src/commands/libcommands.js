// get a destination for a command
//. words could specify nothing, an adjacent edge name / direction,
// node name, abs path, id, rownum, adjective+noun, 'back', 'fwd',
// or something in the location history / context, connection string, etc.
// eg undefined, 'north', 'author', 'home', '/home', 'hello.txt', '2', 'books',
// 'back', 'blue mushroom', 'http://neomem.io/test.md'.
//. handle disambiguation - eg 'go mushroom' - could be the blue or red one.
//. should return a { datasource, location }?
// because could be looking at a different datasource + path,
// eg 'edit /home/blog/index.md' - datasource is markdown file, ?
export function getDestination({ datasource, location, words, past, table }) {
  const destination = words[1] || datasource.path
  return destination
}
