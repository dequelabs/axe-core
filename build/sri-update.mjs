/**
 * SRI Update will update the sri-history.json file
 * In the project root. The sri-history.json file contains
 * SRI hashes of each released version. This can be used
 * to validate that something is a known axe-core source
 * file.
 *
 * When running `npm run release`, this script will execute and
 * update sri-history.json with the SRIs of axe{.*}.js.
 * @deprecated
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const sriToolbox = require('sri-toolbox');

// Check if we should be validating or updating
const validate = process.argv.some(arg => arg === '--validate');

const root = path.join(__dirname, '..');
const axeVersion = JSON.parse(
  fs.readFileSync(path.join(root, 'package.json'), 'utf8')
).version;
let axeHistory = JSON.parse(
  fs.readFileSync(path.join(root, 'sri-history.json'), 'utf8')
);

if (typeof axeHistory[axeVersion] !== 'object') {
  axeHistory[axeVersion] = {};
}
const versionSRIs = axeHistory[axeVersion];

// List all axe files (including minified and localized axe files)
const axeFiles = fs
  .readdirSync(root)
  .filter(file => file.match(/^axe(\.[a-z.-]+)?\.js$/));

axeFiles.forEach(axeFile => {
  const axeSource = fs.readFileSync(path.join(root, axeFile), 'utf-8');
  const axeIntegrity = sriToolbox.generate(
    { algorithms: ['sha256'] },
    axeSource
  );

  if (!validate) {
    // Update SRI
    versionSRIs[axeFile] = axeIntegrity;

    // Test if the SRI shouldn't be changed
  } else if (versionSRIs[axeFile] && versionSRIs[axeFile] !== axeIntegrity) {
    console.log(axeFile, 'did not match the SRI in sri-history.json');
    process.exitCode = 1;
  }
});

if (!validate) {
  fs.writeFileSync(
    path.join(root, './sri-history.json'),
    JSON.stringify(axeHistory, null, '\t'),
    'utf-8'
  );
  console.log('Updated sri-history.json ');
} else if (process.exitCode === 1) {
  console.log(
    '\nMake sure the package version and sri-history.json is updated ' +
      'before publishing to NPM.\n'
  );
}
