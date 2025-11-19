#!/usr/bin/env node

/**
 * @fileoverview Validates the package before publishing.
 * This script performs several checks to ensure the package
 * is correctly set up, including:
 * - Verifying the existence of files listed in `package.json`'s `files` array.
 * - Ensuring the package can be imported using both ESM `import` and CommonJS `require()`.
 * - Validating Subresource Integrity (SRI) hashes for the built files.
 *
 * The script generates a summary report compatible with
 * GitHub Actions, providing detailed feedback on each
 * validation step.
 *
 * Running this script locally has a few implications to be
 * aware of:
 * 1. It links and unlinks the package globally. So this
 * could impact other workspaces where current links are used.
 * 2. To test the step summary, set the `GITHUB_STEP_SUMMARY`
 * environment variable to a file path. If this file does not
 * exist, it will be created.
 */

import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { access, appendFile, readFile } from 'node:fs/promises';
import { execSync } from 'node:child_process';
import pkg from '../../package.json' with { type: 'json' };

const isDebug = process.env.DEBUG === 'true';
const repoRoot = resolve(import.meta.dirname, '..', '..');
/**
 * Start the exit code at 0 for a successful run. If any checks
 * fail, we increment by 1 for each failure. When every check is done,
 * we exit with the final exit code.
 *
 * This means our exit code informs us of how many failures happened.
 *
 * For anyone unfamiliar with exit codes in shell programs,
 * an exit code of `0` means success, and any non-zero exit code
 * means failure.
 *
 * Special note as well, in theory this _could_ go above `255`,
 * causing the actual exit code to wrap around back to `0` and
 * keep counting. But, if we have that many checks in here down
 * the road then all the validation will need a major refactor.
 */
let exitCode = 0;
const missing = [];
const summaryFile = process.env.GITHUB_STEP_SUMMARY;
let summary = `# Package Validation

<dl>
  <dt>Package Name</dt>
  <dd>${pkg.name}</dd>
  <dt>Package Version</dt>
  <dd>${pkg.version}</dd>
  <dt>License</dt>
  <dd>${pkg.license}</dd>
</dl>

`;

console.group('Package Information');
console.log('Name:', pkg.name);
console.log('Version:', pkg.version);
console.log('License:', pkg.license);
console.groupEnd();

/**
 * Checks if a file or folder exists on the filesystem.
 *
 * @param {string} path - The path to check (relative to repo root)
 * @returns {Promise<boolean>} True if the path exists, false otherwise
 */
const exists = async path => {
  const absolutePath = resolve(repoRoot, path);
  try {
    await access(absolutePath);
    return true;
  } catch {
    return false;
  }
};

/**
 * Appends text to the GitHub Actions step summary file if it
 * exists. This is mostly useful for local testing where the
 * summary file may not be set. However if we want to set it
 * for testing, we can.
 *
 * Since we build the summary in chunks, this function
 * appends the current summary and then clears it for the
 * next section.
 *
 * @param {string} text - The text to append to the summary file
 * @returns {Promise<void>}
 */
const appendToSummaryFile = async text => {
  if (summaryFile) {
    await appendFile(summaryFile, text);
    summary = '';
  }
};

/**
 * Verifies that all files and folders listed in the `files`
 * array of `package.json` exist in the repository.
 */
const fileExistenceCheck = async () => {
  summary += `
\n## File Existence Check

The following results table shows the status of files and folders
listed in the \`files\` array of \`package.json\`.

> [!NOTE]
> This check only validates the existence of files and folders
> defined. It does not validate the contents. Thus a folder
> could exist but be empty and still pass this check. Or
> a file could exist but have incorrect syntax.

| File | Status |\n|------|--------|
`;

  console.log('Checking for existence of package files:');

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
    await appendToSummaryFile(
      `\n**ERROR: Missing files: ${missing.join(', ')}**\n`
    );
    console.error(`::error::Missing files: ${missing.join(', ')}`);
    exitCode++;
  }
};

/**
 * Validates that the main package file can be loaded via
 * CommonJS require. This ensures backward compatibility
 * for projects using CommonJS.
 */
const validateCommonJS = async () => {
  summary += `\n## CommonJS Compatibility Check

This check validates that the main package file can be loaded
using CommonJS \`require()\`, ensuring backward compatibility.

| File | Status | Version |\n|------|--------|--------|
`;

  const require = createRequire(import.meta.url);

  console.log('Validating CommonJS compatibility:');

  try {
    const axe = require(`${pkg.name}`);

    if (!axe || typeof axe !== 'object') {
      throw new Error('Module did not export an object');
    }

    if (!axe.version) {
      throw new Error('Missing version property');
    }

    console.info(`✓ ${pkg.name} (CommonJS)`);
    summary += `| \`${pkg.name}\` | ✓ CommonJS Compatible | ${axe.version} |\n`;
  } catch (error) {
    console.error(`✗ ${pkg.name} (CommonJS):`, error.message);
    summary += `| \`${pkg.name}\` | ✗ CommonJS Failed | Not Found |\n`;
    summary += `\n\`\`\`\n${error.message}\n\`\`\`\n`;
    exitCode++;
  }

  await appendToSummaryFile(summary);
};

/**
 * Validates that the package and all files listed in the
 * `files` array of `package.json` can be imported using
 * ESM `import` statements.
 */
const validateImportable = async () => {
  summary += `\n## Importable Check

This check attempts to import the package. As well as all
defined files in the \`files\` array of \`package.json\`.

> [!NOTE]
> This check fails anything that resolves to \`node_modules\`,
> this is because \`axe-core\` should be linked before
> this is called. When \`exports\` can be added to the
> package definition, then we can self reference imports and
> the link will no longer be required.

| File | Status | Version |\n|------|--------|--------|
`;

  const importTargets = [...pkg.files.map(file => `${pkg.name}/${file}`)];
  let anyCaught = false;

  console.log('Validating package files are importable:');

  try {
    const axe = await import(pkg.name);
    console.info(`✓ ${pkg.name}`);

    if (!axe.default?.version) {
      throw new Error('Missing version property');
    }

    summary += `| \`${pkg.name}\` | ✓ Importable | ${axe.default.version} |\n`;
  } catch {
    console.error(`✗ ${pkg.name}`);
    summary += `| \`${pkg.name}\` | ✗ Not Importable | Not Found |\n`;
    anyCaught = true;
  }

  for (const target of importTargets) {
    // Skip things that can't be imported directly
    // One day we can hopefully import anything as bytes to validate.
    // Ref: https://github.com/tc39/proposal-import-bytes
    if (
      target.endsWith('.txt') ||
      target.endsWith('/') ||
      target.endsWith('.d.ts')
    ) {
      continue;
    }

    // `import.meta.resolve` is used here to determine
    // where the import would be resolved from, following
    // any symlinks. Since this package is linked, it
    // should never have `node_modules` in the resolved
    // path. It *could* happen if a dev is writing code
    // within a parent folder named as such, but that is
    // unsafe anyways.
    // -------------------------------------------------
    // If this is ever setup to run in the post-deploy
    // test, then this will cause issues as that runs
    // from this folder specifically.
    if (import.meta.resolve(target).includes('node_modules')) {
      exitCode++;
      summary += `| \`${target}\` | ✗ Resolves to node_modules |\n`;
      console.error(`✗ ${target} resolves to node_modules`);
      continue;
    }

    try {
      let version = '';
      if (target.endsWith('.json')) {
        const data = await import(target, { with: { type: 'json' } });
        version = Object.keys(data.default).at(-1);
      } else {
        const axe = await import(target);

        if (!axe.default?.version) {
          throw new Error('Missing version property');
        }

        version = axe.default.version;
      }
      console.info(`✓ ${target}`);
      summary += `| \`${target}\` | ✓ Importable | ${version} |\n`;
    } catch (error) {
      console.error(`✗ ${target}`);
      summary += `| \`${target}\` | ✗ Not Importable | Not Found |\n`;
      summary += `\n\`\`\`\n${error.message}\n\`\`\`\n`;
      anyCaught = true;
    }
  }

  if (anyCaught) {
    exitCode++;
  }

  await appendToSummaryFile(summary);
};

/**
 * When a PR targets `master` or a `release-*` branch,
 * or these branches are pushed to, we run SRI validation.
 * Otherwise, it is skipped since the SRI hashes are only
 * updated when releasing.
 *
 * The history file is deprecated. However, until it is removed
 * we should be prudent and continue to validate it.
 */
const validateSriHashes = async () => {
  const currentBranch =
    process.env.GITHUB_REF_NAME || process.env.GITHUB_HEAD_REF || '';

  if (!/^release-.+/.test(currentBranch) && currentBranch !== 'master') {
    console.log(`Skipping SRI validation (current branch: ${currentBranch})`);
    return;
  }

  summary += `\n## Subresource Integrity Check

This check validates the current build against the SRI hash
for the version defined in \`sri-history.json\`.

| File | Status |
|------|--------|
`;

  const sriHistory = await import(`${pkg.name}/sri-history.json`, {
    with: { type: 'json' }
  });
  const expectedSri = sriHistory.default[pkg.version];
  // calculate the SRI hash for `axe.js` and `axe.min.js`
  // Using `sri-toolbox` as that is what is used in the build process
  const { generate } = await import('sri-toolbox');

  const filesToCheck = [
    {
      name: 'axe.js',
      path: fileURLToPath(import.meta.resolve(`${pkg.name}/axe.js`))
    },
    {
      name: 'axe.min.js',
      path: fileURLToPath(import.meta.resolve(`${pkg.name}/axe.min.js`))
    }
  ];
  const mismatches = [];

  for (const file of filesToCheck) {
    const calculatedSri = generate(
      { algorithms: ['sha256'] },
      await readFile(file.path)
    );

    console.log(`Expected SRI for ${file.name}:`, expectedSri[file.name]);
    console.log(`Calculated SRI for ${file.name}:`, calculatedSri);
    if (calculatedSri !== expectedSri[file.name]) {
      console.error(`✗ ${file.name}`);
      summary += `| \`${file.name}\` | ✗ Invalid SRI |\n`;
      mismatches.push({
        name: file.name,
        expected: expectedSri[file.name],
        calculated: calculatedSri
      });
      continue;
    }

    console.info(`✓ ${file.name}`);
    summary += `| \`${file.name}\` | ✓ Valid SRI |\n`;
  }

  if (mismatches.length > 0) {
    summary += `\n### SRI Mismatches\n\n`;

    for (const mismatch of mismatches) {
      summary += `**${mismatch.name}:**\n`;
      summary += `- Expected: \`${mismatch.expected}\`\n`;
      summary += `- Calculated: \`${mismatch.calculated}\`\n\n`;
    }

    exitCode++;
  }

  await appendToSummaryFile(summary);
};

// Start running checks that don't require linking first.
await fileExistenceCheck();

/**
 * @type {import('child_process').ExecSyncOptionsWithBufferEncoding}
 */
const execOptions = {
  cwd: repoRoot,
  stdio: isDebug ? 'inherit' : 'pipe',
  timeout: 200000
};

console.log('Creating npm link for package validation...');

try {
  // Link the package globally, then update the package
  // internally to use the linked version.
  // This is needed because we don't have `exports` defined
  // yet, so self referencing imports won't work.
  // We also have a circular dependency on the package.
  // That means if we try to resolve the import without
  // linking, it will resolve the version in `node_modules`
  // from npm.
  execSync('npm link', execOptions);
  execSync(`npm link ${pkg.name}`, execOptions);

  // Run any checks that require the package to reference itself.
  await validateCommonJS();
  await validateImportable();
  await validateSriHashes();
} catch (error) {
  console.error('Failed to create npm link:', error.message);
  await appendToSummaryFile(`
    ## Failed to create npm link

    <details><summary>Click to expand error details</summary>

    \n\`\`\`\n${error.message}\n\`\`\`\n

    </details>

    This failure prevented running critical validation checks.
    Therefore the entire validation has failed.
  `);
  console.error(`Failed to create npm link: ${error.message}`);
  exitCode++;
}

console.log('Removing npm link...');
try {
  execSync(`npm unlink ${pkg.name}`, execOptions);
  execSync('npm unlink -g', execOptions);
} catch (error) {
  // Not a hard failure if unlinking fails since all these
  // checks are last. As long as they completed fine,
  // validation is acceptable.
  // This is more for when running locally to test if
  // something goes wrong. As the developer's machine state
  // is impacted and they need to know about it.
  console.error('Failed to remove npm link:', error.message);
}

process.exit(exitCode);
