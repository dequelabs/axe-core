import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { analyzeLibBuildChanges } from './analyze-lib-build-changes.mjs';
import { root } from './root.mjs';

describe('analyzeLibBuildChanges', () => {
  test('ignores generated metadata-function-map', () => {
    const { plan, testPaths } = analyzeLibBuildChanges(root, [
      'lib/core/base/metadata-function-map.js'
    ]);
    assert.equal(plan, 'rebuild');
    assert.equal(testPaths.length, 0);
  });

  test('skips auto-tests for large batches', () => {
    const paths = Array.from(
      { length: 11 },
      (_, i) => `lib/rules/batch-test-rule-${i}.json`
    );
    const { plan, testPaths } = analyzeLibBuildChanges(root, paths);
    assert.equal(plan, 'rebuild (batch; skip tests)');
    assert.equal(testPaths.length, 0);
  });

  test('resolves a unit test for a known lib file', () => {
    const { plan, testPaths } = analyzeLibBuildChanges(root, [
      'lib/commons/text/sanitize.js'
    ]);
    assert.equal(plan, 'rebuild + unit test');
    assert.ok(
      testPaths.some(p =>
        p.replace(/\\/g, '/').endsWith('test/commons/text/sanitize.js')
      )
    );
  });

  test('resolves integration tests for an existing rule spec', () => {
    const { plan, testPaths } = analyzeLibBuildChanges(root, [
      'lib/rules/button-name.json'
    ]);
    assert.equal(plan, 'rebuild + build integration tests + rule integration');
    assert.ok(
      testPaths.some(p =>
        p
          .replace(/\\/g, '/')
          .endsWith('tmp/integration-tests/button-name/button-name.test.js')
      )
    );
  });
});
