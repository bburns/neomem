
//. will need to do some kind of conditional import -
// iterate over all installed '@neomem/source-*' packages?
import makeNeo4j from '@neomem/source-neo4j'
import makeFilesys from '@neomem/source-filesys'


const makeSourceFns = {
  'neo4j': makeNeo4j,
  'filesys': makeFilesys,
}

export default function makeSource(sourceType) {
  const makeSourceFn = makeSourceFns[sourceType]
  const source = makeSourceFn()
  return source
}
