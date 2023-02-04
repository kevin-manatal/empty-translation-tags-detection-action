import {getFilesRecursively, getFilesContentInJson} from './iohelpers'

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