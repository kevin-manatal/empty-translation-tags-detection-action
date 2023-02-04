import fs from 'fs'
import path from 'path'

export const getFilesRecursively = (dir: string, files: string[]) => {
  if (!files) {
    files = []
  }

  const filesInDir = fs.readdirSync(dir)

  for (const file of filesInDir) {
    const absolute = path.join(dir, file)
    if (fs.statSync(absolute).isDirectory()) {
      getFilesRecursively(absolute, files)
    } else {
      if (absolute && absolute.toLocaleLowerCase().endsWith('.json')) {
        files.push(absolute)
      }
    }
  }

  return files
}

export const getFilesContentInJson = (filePath: string) => {
  return JSON.parse(fs.readFileSync(filePath).toString())
}
