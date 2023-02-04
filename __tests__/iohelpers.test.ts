import {
  getFilesRecursively,
  getFileContentInJson, getFilesContent, getJsonFileContentLength, convertToPosix, getFileMeta,
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
      getFileContentInJson('')
    } catch (e: any) {
      expect(e.message.length).toBeTruthy()
    }
  })

  test('when passing a path but not json then return an exception', () => {
    try {
      getFileContentInJson('./__tests__/functions.test.ts')
    } catch (e: any) {
      expect(e.message.length).toBeTruthy()
    }
  })

  test('when passing in a json file then the output should match', () => {
    const result = getFileContentInJson('./__tests__/set1/sample.json')
    expect(result).toEqual({
      start: 'Start',
      confirm: 'Confirm'
    })
  })
})

describe('getFilesContent tests', () => {
  test('when not passing in a valid path then return an exception', () => {
    try {
      getFilesContent('')
    } catch (e: any) {
      expect(e.message.length).toBeTruthy()
    }
  })

  test('when passing a valid path then we expect a result', () => {
    const result = getFilesContent('./__tests__/functions.test.ts')
    expect(result).toBeTruthy()
  })
})

describe('getJsonFileContentLength tests', () => {
  test('when passing a valid path with two elements', () => {
    const result = getJsonFileContentLength('./__tests__/set1/sample.json')
    expect(result).toBe(2)
  })

  test('when passing a path but not json then return an exception', () => {
    try {
      getJsonFileContentLength('./__tests__/functions.test.ts')
    } catch (e: any) {
      expect(e.message.length).toBeTruthy()
    }
  })
})

describe('convertToPosix tests', () => {
  test('when passing a path then return as expected (windows)', () => {
    const result = convertToPosix('\\__tests__\\set1\\sample.json')
    expect(result).toBe('/__tests__/set1/sample.json')
  })

  test('when passing a path then return as expected', () => {
    const result = convertToPosix('./__tests__/set1/sample.json')
    expect(result).toBe('__tests__/set1/sample.json')
  })
})

describe('getFileMeta tests', () => {
  test('when providing a valid path set4', () => {
    const result = getFileMeta('./__tests__/set4/')
    expect(result).toStrictEqual([{"file": "DE/admin.json", "numberOfLines": 1}, {"file": "DE/main.json",
      "numberOfLines": 2}, {"file": "EN/admin.json", "numberOfLines": 2}, {"file": "EN/main.json", "numberOfLines": 2}])
  })

  test('when providing a valid path set5', () => {
    const result = getFileMeta('./__tests__/set5/')
    expect(result).toStrictEqual([{"file": "DE/main.json", "numberOfLines": 2},
      {"file": "EN/admin.json", "numberOfLines": 1}, {"file": "EN/main.json", "numberOfLines": 2}])
  })
})