'use strict';

const fs = require('fs');
const path = require('path');

const getFilesRecursively = (dir, files) => {
  if (!files) {
    files = [];
  }

  const filesInDir = fs.readdirSync(dir);

  for (const file of filesInDir) {
    const absolute = path.join(dir, file);
    if (fs.statSync(absolute).isDirectory()) {
      getFilesRecursively(absolute, files);
    } else {
      if (absolute && absolute.toLocaleLowerCase().endsWith('.json')) {
        files.push(absolute);
      }
    }
  }

  return files;
};

const getFilesContentInJson = (filePath) => {
  return JSON.parse(fs.readFileSync(filePath));
};

const hasEmptyTags = (content) => {
  if (!content) {
    return false;
  }

  for (const key in content) {
    if (content.hasOwnProperty(key) && !content[key]) {
      return true;
    }
  }

  return false;
};

const checkForEmptyTags = (fullPath) => {
  const files = getFilesRecursively(fullPath);
  let emptyTagsFound = false;

  for (const file of files) {
    const content = getFilesContentInJson(file);
    emptyTagsFound = hasEmptyTags(content);

    if (emptyTagsFound) {
      break;
    }
  };

  return emptyTagsFound;
};

module.exports = {
  getFilesRecursively,
  getFilesContentInJson,
  hasEmptyTags,
  checkForEmptyTags,
};
