#!/usr/bin/env node

import pkg from '../../package.json' with { type: 'json' };
import {exists, appendFile} from 'node:fs/promises';

const missing = [];
const summaryFile = process.env.GITHUB_STEP_SUMMARY;
let summary = '# Package Files Validation\n\n';
summary += '| File | Status |\n|------|--------|\n';

for (const file of pkg.files) {
  if (await exists(file)) {
    console.info('✓ ' + file);
    summary += '| \`' + file + '\` | ✓ Found |\n';
  } else {
    console.error('✗ ' + file);
    summary += '| \`' + file + '\` | ✗ Missing |\n';
    missing.push(file);
  }
}

await appendFile(summaryFile, summary);

if (missing.length > 0) {
  await appendFile(summaryFile, '\n**ERROR: Missing files: ' + missing.join(', ') + '**\n');
  console.error('::error::Missing files: ' + missing.join(', '));
  process.exit(1);
}
