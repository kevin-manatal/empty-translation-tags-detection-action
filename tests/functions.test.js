const functions = require('../src/functions');

describe('getFilesRecursively tests', () => {
  test('when files are avalable then must return the files', () => {
    const files = functions.getFilesRecursively('./tests/set1/');
    expect(files.length === 1).toBeTruthy();
  });

  test('when files avalable recursively then must return the files', () => {
    const files = functions.getFilesRecursively('./tests/set3');
    expect(files.length === 1).toBeTruthy();
  });

  test('when the directroy does not exists then return an exception', () => {
    const error = 'ENOENT: no such file or directory, scandir \'./not_exists\'';
    try {
      functions.getFilesRecursively('./not_exists');
    } catch (e) {
      expect(e.message).toBe(error);
    }
  });
});

describe('getFilesContentInJson tests', () => {
  test('when not passing in a valid path then return an exception', () => {
    try {
      functions.getFilesContentInJson(undefined);
    } catch (e) {
      expect(e.message.length).toBeTruthy();
    }
  });

  test('when passing a path but not json then return an exception', () => {
    try {
      functions.getFilesContentInJson('./tests/functions.test.js');
    } catch (e) {
      expect(e.message.length).toBeTruthy();
    }
  });

  test('when passing in a json file then the output should match', () => {
    const result = functions.getFilesContentInJson('./tests/set1/sample.json');
    expect(result).toEqual({
      start: 'Start',
      confirm: 'Confirm',
    });
  });
});

describe('hasEmptyTags tests', () => {
  test('when not passing valid content then return false', () => {
    const result = functions.hasEmptyTags(undefined);
    expect(result).toBeFalsy();
  });

  test('when passing content with a missing value then return true', () => {
    const input = {
      start: 'Start',
      confirm: '',
    };

    const result = functions.hasEmptyTags(input);
    expect(result).toBeTruthy();
  });

  test('when passing content without missing vaues then return false', () => {
    const input = {
      start: 'Start',
      confirm: 'Confirm',
    };

    const result = functions.hasEmptyTags(input);
    expect(result).toBeFalsy();
  });
});

describe('checkForEmptyTags tests', () => {
  test('when all files have keys with values then return false', () => {
    const result = functions.checkForEmptyTags('./tests/set1/');
    expect(result).toBeFalsy();
  });

  test('when not all files have keys with values then return true', () => {
    const result = functions.checkForEmptyTags('./tests/set2/');
    expect(result).toBeTruthy();
  });

  test('when recursive checking with missing values then return true', () => {
    const result = functions.checkForEmptyTags('./tests/set3/');
    expect(result).toBeTruthy();
  });
});
