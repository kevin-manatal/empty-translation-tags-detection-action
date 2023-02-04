import * as core from '@actions/core'
import {checkForEmptyTags} from './functions'

async function run(): Promise<void> {
  try {
    const fullPath = core.getInput('full-path')
    core.debug(`fullPath: ${fullPath}`)

    const hasEmptyTags = checkForEmptyTags(fullPath)
    core.setOutput('found-empty-tags', hasEmptyTags)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
