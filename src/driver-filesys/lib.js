import fs from 'fs/promises'
// import pathlib from 'path'

export async function isDir(path) {
  try {
    const stat = await fs.stat(path)
    return stat.isDirectory()
  } catch (e) {
    // stat throws an error if path doesn't exist
    return false
  }
}

export async function readDir(path) {
  return await fs.readdir(path)
}

export async function readFile(path, nchars) {
  if (!nchars) {
    return String(fs.readFile(path))
  }
  const file = await fs.open(path, 'r')
  const { buffer } = await file.read(Buffer.alloc(nchars), 0, nchars, 0)
  await file.close()
  return String(buffer)
}
