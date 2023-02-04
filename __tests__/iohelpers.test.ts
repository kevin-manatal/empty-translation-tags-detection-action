import {
  getFilesRecursively,
  getFilesContentInJson
} from '../src/iohelpers'

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