#!/usr/bin/env node

import {resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createRequire} from 'node:module';
import pkg from '../../package.json' with { type: 'json' };
import {access, appendFile, readFile} from 'node:fs/promises';
import {execSync} from 'node:child_process';

const isDebug = process.env.RUNNER_DEBUG === '1' || process.env.DEBUG === 'true';
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
    summary = '';
  }
};

const fileExistenceCheck = async () => {
  summary += `
\n## File Existence Check

The following results table shows the status of files and folders
listed in the \`files\` array of \`package.json\`.

> ![INFO]
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
    await appendToSummaryFile(`\n**ERROR: Missing files: ${missing.join(', ')}**\n`);
    console.error(`::error::Missing files: ${missing.join(', ')}`);
    exitCode++;
  }
};

/**
 * Validates that the main package file can be loaded via CommonJS require.
 * This ensures backward compatibility for projects using CommonJS.
 */
const validateCommonJS = async () => {
  summary += `\n## CommonJS Compatibility Check

This check validates that the main package file can be loaded
using CommonJS \`require()\`, ensuring backward compatibility.

| File | Status |
|------|--------|
`;

  const require = createRequire(import.meta.url);

  console.log('Validating CommonJS compatibility:');

  try {
    const axe = require(`${pkg.name}`);
    console.info(`✓ ${pkg.name} (CommonJS)`);
    summary += `| \`${pkg.name}\` | ✓ CommonJS Compatible |\n`;

    // Verify it actually exported something
    if (!axe || typeof axe !== 'object') {
      console.error(`✗ ${pkg.name} exported invalid value`);
      summary += `| \`${pkg.name}\` export | ✗ Invalid export |\n`;
      exitCode++;
    }

    if (axe.version !== pkg.version) {
      console.error(`✗ ${pkg.name} version mismatch: expected ${pkg.version}, got ${axe.version}`);
      summary += `| \`${pkg.name}\` version | ✗ Version Mismatch |\n`;
      exitCode++;
    }
  } catch (error) {
    console.error(`✗ ${pkg.name} (CommonJS):`, error.message);
    summary += `| \`${pkg.name}\` | ✗ CommonJS Failed |\n`;
    summary += `\n\`\`\`\n${error.message}\n\`\`\`\n`;
    exitCode++;
  }

  await appendToSummaryFile(summary);
};

/**
 * Since this validation script is running under ESM, we can
 * import the package files without any extra scaffolding.
 * Allowing us to validate before publishing that the package
 * will be usable.
 */
const validateImportable = async () => {
  summary += `\n## Importable Check

This check attempts to import the package. As well as all
defined files in the \`files\` array of \`package.json\`.

> ![INFO]
> This check fails anything that resolves to \`node_modules\`,
> this is because \`axe-core\` should be linked before
> this is called. When \`exports\` can be added to the
> package definition, then we can self reference imports and
> the link will no longer be required.

| File | Status | Version |\n|------|--------|--------|
`;

  const importTargets = [...pkg.files.map((file) => `${pkg.name}/${file}`)];
  let anyCaught = false;

  console.log('Validating package files are importable:');

  try {
    const axe = await import(pkg.name);
    console.info(`✓ ${pkg.name}`);
    summary += `| \`${pkg.name}\` | ✓ Importable | ${axe.default.version} |\n`;
  } catch (error) {
    console.error(`✗ ${pkg.name}`);
    summary += `| \`${pkg.name}\` | ✗ Not Importable | |\n`;
    anyCaught = true;
  }

  for (const target of importTargets) {
    // Skip things that can't be imported directly
    // One day we can hopefully import anything as bytes to validate.
    // Ref: https://github.com/tc39/proposal-import-bytes
    if (target.endsWith('.txt') || target.endsWith('/') || target.endsWith('.d.ts')) {
      continue;
    }

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
        // Ensure version is empty since it doesn't apply to the json file.
        // This keeps the table aligned and prevents it from showing a version
        // when it might be set from a previous loop iteration.
        version = Object.keys(data.default).at(-1);
      } else {
        const axe = await import(target);
        version = axe.default.version;
        if (version !== pkg.version) {
          console.error(`✗ ${target} version mismatch: expected ${pkg.version}, got ${version}`);
          summary += `| \`${target}\` | ✗ Version Mismatch | ${version} |\n`;
          anyCaught = true;
          continue;
        }
      }
      console.info(`✓ ${target}`);
      summary += `| \`${target}\` | ✓ Importable | ${version} |\n`;
    } catch (error) {
      console.error(`✗ ${target}`);
      summary += `| \`${target}\` | ✗ Not Importable |\n`;
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
  const currentBranch = process.env.GITHUB_REF_NAME ||
    process.env.GITHUB_HEAD_REF ||
    '';

  if (
    !/^release-.+/.test(currentBranch) &&
    currentBranch !== 'master'
  ) {
    console.log(`Skipping SRI validation (current branch: ${currentBranch})`);
    return;
  }

  summary += `\n## Subresource Integrity Check

This check validates the current build against the SRI hash
for the version defined in \`sri-history.json\`.

| File | Status |
|------|--------|
`;

  const sriHistory = await import(`${pkg.name}/sri-history.json`, { with: { type: 'json' } });
  const expectedSri = sriHistory.default[pkg.version];
  // calculate the SRI hash for `axe.js` and `axe.min.js`
  // Using `sri-toolbox` as that is what is used in the build process
  const { generate } = await import('sri-toolbox');

  const filesToCheck = [
    { name: 'axe.js', path: fileURLToPath(import.meta.resolve(`${pkg.name}/axe.js`)) },
    { name: 'axe.min.js', path: fileURLToPath(import.meta.resolve(`${pkg.name}/axe.min.js`)) },
  ];
  const mismatches = [];

  for (const file of filesToCheck) {
    const calculatedSri = generate(
      { algorithms: ['sha256'] },
      await readFile(file.path),
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

await fileExistenceCheck();

const execOptions = {
  cwd: repoRoot,
  stdio: isDebug ? 'inherit' : 'pipe'
};

console.log('Creating npm link for package validation...');

try {
  // First, create the global link
  execSync('npm link', execOptions);
  // Then, link it to itself locally so imports resolve to the current package
  execSync(`npm link ${pkg.name}`, execOptions);

  // Run any checks that require the package to reference itself.
  await validateCommonJS();
  await validateImportable();
  await validateSriHashes();
} catch (error) {
  console.error('Failed to create npm link:', error.message);
  exitCode++;
} finally {
  console.log('Removing npm link...');
  try {
    // Unlink local symlink first
    execSync(`npm unlink ${pkg.name}`, execOptions);
    // Then remove global link
    execSync('npm unlink -g', execOptions);
  } catch (error) {
    console.warn('Failed to remove npm link:', error.message);
  }
}

process.exit(exitCode);
