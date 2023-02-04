import {
  getFilesRecursively,
  getFileContentInJson,
  getFileMeta
} from './iohelpers'
import {fileMeta, fileMetaStats} from './interfaces'

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
    const content = getFileContentInJson(file)
    emptyTagsFound = hasEmptyTags(content)

    if (emptyTagsFound) {
      break
    }
  }

  return emptyTagsFound
}

export const checkForMissingTags = (fullPath: string) => {
  const meta = getFileMeta(fullPath)
  const stats = createFileMetaStats(meta)
  const hasMissingTags = missingTagsInStats(stats)
  return hasMissingTags
}

export const missingTagsInStats = (stats: fileMetaStats[]) => {
  const firstEntry = stats[0]

  for (let i = 1; i < stats.length; i++) {
    const entry = stats[i]
    if (
      entry.numberOfLines !== firstEntry.numberOfLines ||
      entry.numberOfFiles !== firstEntry.numberOfFiles
    ) {
      return true
    }
  }
  return false
}

export const createFileMetaStats = (meta: fileMeta[]) => {
  const stats: fileMetaStats[] = []

  for (const file of meta) {
    const numberOfLines = file.numberOfLines
    const rootFolder = file.file.split('/')[0]
    const item = stats.find(i => i.rootFolder === rootFolder)

    if (item) {
      item.numberOfLines = item.numberOfLines + numberOfLines
      item.numberOfFiles = item.numberOfFiles + 1
    } else {
      stats.push({
        rootFolder,
        numberOfLines,
        numberOfFiles: 1
      })
    }
  }

  return stats
}
