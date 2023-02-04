import fs from 'fs'
import path from 'path'
import {fileMeta} from './interfaces'

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

export const getFileContentInJson = (filePath: string) => {
  return JSON.parse(fs.readFileSync(filePath).toString())
}

export const getFilesContent = (filePath: string) => {
  return fs.readFileSync(filePath).toString()
}

export const getJsonFileContentLength = (filePath: string) => {
  const content = getFileContentInJson(filePath)
  return Object.keys(content).length
}

export const convertToPosix = (dir: string) => {
  dir = dir.replace('./', '')
  const posix = dir.split(path.sep).join(path.posix.sep)
  return posix
}
export const getFileMeta = (fullPath: string) => {
  const meta: fileMeta[] = []
  const files = getFilesRecursively(fullPath, [])
  const fullPathPosix = convertToPosix(fullPath)

  for (const file of files) {
    const numberOfLines = getJsonFileContentLength(file)
    meta.push({
      file: convertToPosix(file).replace(fullPathPosix, ''),
      numberOfLines
    })
  }
  return meta
}
