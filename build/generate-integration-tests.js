'use strict';

/**
 * Generates test files for integration rule tests in tmp/integration-tests/.
 * This replaces the Karma preprocessor (test/integration/rules/preprocessor.js)
 * that combined *.json + *.html pairs into executable JS at serve-time.
 *
 * Output files are picked up by web-test-runner via the test:unit:integration script.
 */

const path = require('path');
const fs = require('fs');
const { globSync } = require('glob');

const rootDir = path.join(__dirname, '..');
const rulesDir = path.join(rootDir, 'test', 'integration', 'rules');
const outDir = path.join(rootDir, 'tmp', 'integration-tests');
const runnerTemplate = fs.readFileSync(
  path.join(rulesDir, 'runner.js'),
  'utf-8'
);

// Clean and recreate output directory
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir, { recursive: true });

const jsonFiles = globSync('**/*.json', { cwd: rulesDir });

let count = 0;
for (const relPath of jsonFiles) {
  const jsonPath = path.join(rulesDir, relPath);
  const htmlPath = jsonPath.replace(/\.json$/, '.html');

  if (!fs.existsSync(htmlPath)) {
    // Some JSON files may not have a sibling HTML (e.g. nested frame fixtures)
    continue;
  }

  let test;
  try {
    test = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  } catch (e) {
    throw new Error(`Unable to parse ${jsonPath}: ${e.message}`);
  }

  const html = fs.readFileSync(htmlPath, 'utf-8');
  test.content = html;

  const outPath = path.join(outDir, relPath.replace(/\.json$/, '.test.js'));
  const outDirForFile = path.dirname(outPath);
  fs.mkdirSync(outDirForFile, { recursive: true });

  const output = runnerTemplate.replace('{}; /*tests*/', JSON.stringify(test));
  fs.writeFileSync(outPath, output, 'utf-8');
  count++;
}

console.log(
  `Generated ${count} integration test files in tmp/integration-tests/`
);
