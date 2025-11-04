#!/usr/bin/env node

import {resolve} from 'node:path';
import pkg from '../../package.json' with { type: 'json' };
import {access, appendFile} from 'node:fs/promises';

const repoRoot = resolve(import.meta.dirname, '..', '..');

const missing = [];
const summaryFile = process.env.GITHUB_STEP_SUMMARY;

/**
 * Checks if a file or folder exists on the filesystem.
 *
 * @param {string} path - The path to check (relative to repo root)
 * @returns {Promise<boolean>} True if the path exists, false otherwise
 */
const exists = async (path) => {
  const absolutePath = resolve(repoRoot, path);
  try {
    await access(absolutePath);
    return true;
  } catch {
    return false;
  }
};

/**
 * Appends text to the GitHub Actions step summary file if it exists.
 * This is mostly useful for local testing where the summary file may not be set.
 * However if we want to set it for testing, we can.
 */
const appendToSummaryFile = async (text) => {
  if (summaryFile) {
    await appendFile(summaryFile, text);
  }
};

let summary = '# Package Files Validation\n';

// The extra newlines are important for markdown parsing.
summary += `
  The following results table shows the status of files and folders
  listed in the \`files\` array of \`package.json\`.

  > ![INFO]
  > This check only validates the existence of files and folders
  > defined. It does not validate the contents. Thus a folder
  > could exist but be empty and still pass this check. Or
  > a file could exist but have incorrect syntax.

`;

summary += '| File | Status |\n|------|--------|\n';

for (const file of pkg.files) {
  if (await exists(file)) {
    console.info(`✓ ${file}`);
    summary += `| \`${file}\` | ✓ Found |\n`;
  } else {
    console.error(`✗ ${file}`);
    summary += `| \`${file}\` | ✗ Missing |\n`;
    missing.push(file);
  }
}

await appendToSummaryFile(summary);

if (missing.length > 0) {
  await appendToSummaryFile(`\n**ERROR: Missing files: ${missing.join(', ')}**\n`);
  console.error(`::error::Missing files: ${missing.join(', ')}`);
  process.exit(1);
}
