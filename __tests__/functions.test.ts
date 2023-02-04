import {
  getFilesRecursively,
  getFilesContentInJson,
  hasEmptyTags,
  checkForEmptyTags
} from '../src/functions'
import {describe, expect, test} from '@jest/globals'

describe('getFilesRecursively tests', () => {
  test('when files are available then must return the files', () => {
    const files = getFilesRecursively('./__tests__/set1/', [])
    expect(files.length === 1).toBeTruthy()
  })

  test('when files available recursively then must return the files', () => {
    const files = getFilesRecursively('./__tests__/set3', [])
    expect(files.length === 1).toBeTruthy()
  })

  test('when the available does not exists then return an exception', () => {
    const error = "ENOENT: no such file or directory, scandir './not_exists'"
    try {
      getFilesRecursively('./not_exists', [])
    } catch (e: any) {
      expect(e.message).toBe(error)
    }
  })
})

describe('getFilesContentInJson tests', () => {
  test('when not passing in a valid path then return an exception', () => {
    try {
      getFilesContentInJson('')
    } catch (e: any) {
      expect(e.message.length).toBeTruthy()
    }
  })

  test('when passing a path but not json then return an exception', () => {
    try {
      getFilesContentInJson('./__tests__/functions.test.js')
    } catch (e: any) {
      expect(e.message.length).toBeTruthy()
    }
  })

  test('when passing in a json file then the output should match', () => {
    const result = getFilesContentInJson('./__tests__/set1/sample.json')
    expect(result).toEqual({
      start: 'Start',
      confirm: 'Confirm'
    })
  })
})

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
