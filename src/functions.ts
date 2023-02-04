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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const hasEmptyTags = (content: any) => {
  if (!content) {
    return false
  }

  for (const key in content) {
    if (content.hasOwnProperty(key) && !content[key]) {
      return true
    }
  }

  return false
}

export const checkForEmptyTags = (fullPath: string) => {
  const files = getFilesRecursively(fullPath, [])
  let emptyTagsFound = false

  for (const file of files) {
    const content = getFilesContentInJson(file)
    emptyTagsFound = hasEmptyTags(content)

    if (emptyTagsFound) {
      break
    }
  }

  return emptyTagsFound
}
