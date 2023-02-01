'use strict';

const core = require('@actions/core');
const {
  checkForEmptyTags,
} = require('./functions');

const main = async () => {
  // `full-path`` input defined in action metadata file
  const fullPath = core.getInput('full-path');
  console.log(`full-path ${fullPath}`);

  const hasEmptyTags = checkForEmptyTags(fullPath);

  core.setOutput('found-empty-tags', hasEmptyTags);
};

main().catch((err) => core.setFailed(err.message));
