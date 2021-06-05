import fs from 'fs/promises'

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
  const h = await fs.open(path, 'r')
  const { buffer } = await h.read(Buffer.alloc(nchars), 0, nchars, 0)
  await h.close()
  return String(buffer)
}
