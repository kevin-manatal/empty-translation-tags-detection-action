import * as core from '@actions/core'
import {checkForEmptyTags, checkForMissingTags} from './helpers'

async function run(): Promise<void> {
  try {
    const fullPath = core.getInput('full-path')
    core.debug(`fullPath: ${fullPath}`)

    const hasEmptyTags = checkForEmptyTags(fullPath)
    const hasMissingTags = checkForMissingTags(fullPath)

    core.debug(
      `hasEmptyTags: ${hasEmptyTags} - hasMissingTags: ${hasMissingTags}`
    )

    core.setOutput('found-missing-translations', hasEmptyTags && hasMissingTags)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
