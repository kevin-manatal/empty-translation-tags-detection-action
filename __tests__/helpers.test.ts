import {
  hasEmptyTags,
  checkForEmptyTags, createFileMetaStats, missingTagsInStats, checkForMissingTags
} from '../src/helpers'
import {describe, expect, test} from '@jest/globals'

describe('hasEmptyTags tests', () => {
  test('when not passing valid content then return false', () => {
    const result = hasEmptyTags(undefined)
    expect(result).toBeFalsy()
  })

  test('when passing content with a missing value then return true', () => {
    const input = {
      start: 'Start',
      confirm: ''
    }

    const result = hasEmptyTags(input)
    expect(result).toBeTruthy()
  })

  test('when passing content without missing values then return false', () => {
    const input = {
      start: 'Start',
      confirm: 'Confirm'
    }

    const result = hasEmptyTags(input)
    expect(result).toBeFalsy()
  })
})

describe('checkForEmptyTags tests', () => {
  test('when all files have keys with values then return false', () => {
    const result = checkForEmptyTags('./__tests__/set1/')
    expect(result).toBeFalsy()
  })

  test('when not all files have keys with values then return true', () => {
    const result = checkForEmptyTags('./__tests__/set2/')
    expect(result).toBeTruthy()
  })

  test('when recursive checking with missing values then return true', () => {
    const result = checkForEmptyTags('./__tests__/set3/')
    expect(result).toBeTruthy()
  })
})

describe('createFileMetaStats tests', () => {
  test('when providing a valid path set4', () => {
    const result = createFileMetaStats([{"file": "DE/admin.json", "numberOfLines": 1}, {"file": "DE/main.json",
      "numberOfLines": 2}, {"file": "EN/admin.json", "numberOfLines": 2}, {"file": "EN/main.json", "numberOfLines": 2}])

    expect(result).toStrictEqual([{"numberOfFiles": 2, "numberOfLines": 3, "rootFolder": "DE"},
      {"numberOfFiles": 2, "numberOfLines": 4, "rootFolder": "EN"}])
  })
})

describe('missingTagsInStats tests', () => {
  test('when providing a set with missing lines', () => {
    const result = missingTagsInStats([{"numberOfFiles": 2, "numberOfLines": 3, "rootFolder": "DE"},
      {"numberOfFiles": 2, "numberOfLines": 4, "rootFolder": "EN"}])

    expect(result).toBeTruthy()
  })

  test('when providing a set with missing files', () => {
    const result = missingTagsInStats([{"numberOfFiles": 1, "numberOfLines": 3, "rootFolder": "DE"},
      {"numberOfFiles": 2, "numberOfLines": 3, "rootFolder": "EN"}])

    expect(result).toBeTruthy()
  })

  test('when providing a set with which is equal', () => {
    const result = missingTagsInStats([{"numberOfFiles": 2, "numberOfLines": 3, "rootFolder": "DE"},
      {"numberOfFiles": 2, "numberOfLines": 3, "rootFolder": "EN"}])

    expect(result).toBeFalsy()
  })
})

describe('checkForMissingTags tests', () => {
  test('when there are no missing files', () => {
    const result = checkForMissingTags('./__tests__/set3/')
    expect(result).toBeFalsy()
  })
  test('when there are missing files', () => {
    const result = checkForMissingTags('./__tests__/set5')
    expect(result).toBeTruthy()
  })
  test('when there are missing lines/entries', () => {
    const result = checkForMissingTags('./__tests__/set4')
    expect(result).toBeTruthy()
  })
})


