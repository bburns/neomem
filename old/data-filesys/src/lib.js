

export function getType(stats) {
  const type = stats.isDirectory() ? 'folder' : stats.isFile()  ? 'file' : 
    stats.isSymbolicLink() ? 'link' : 'other'
  return type
}
