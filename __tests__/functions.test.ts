import {
  hasEmptyTags,
  checkForEmptyTags
} from '../src/functions'
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