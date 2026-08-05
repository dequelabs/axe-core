import assert from 'node:assert/strict';
import path from 'node:path';
import { describe, test } from 'node:test';
import { root } from './root.mjs';
import {
  RULE_SPEC_JSON_RE,
  describeWatchTestPlan,
  partitionWatchTestPaths,
  projectRelPath,
  resolveWatchUnitTestPaths,
  resolvedFullIntegrationTestHtmlPaths,
  resolvedGeneratedIntegrationTestPath,
  resolvedIntegrationRuleJsonForLibRuleSpec,
  resolvedUnitTestPathForLibFile,
  unitTestFilesArg
} from './watch-helpers.mjs';

describe('projectRelPath', () => {
  test('normalizes paths relative to the repo root', () => {
    const abs = path.join(root, 'lib/core/index.js');
    assert.equal(projectRelPath(root, abs), 'lib/core/index.js');
    assert.equal(
      projectRelPath(root, 'lib/core/index.js'),
      'lib/core/index.js'
    );
  });
});

describe('RULE_SPEC_JSON_RE', () => {
  test('matches top-level rule JSON only', () => {
    assert.match('lib/rules/button-name.json', RULE_SPEC_JSON_RE);
    assert.doesNotMatch('lib/rules/nested/foo.json', RULE_SPEC_JSON_RE);
    assert.doesNotMatch('lib/checks/foo.json', RULE_SPEC_JSON_RE);
  });
});

describe('resolvedUnitTestPathForLibFile', () => {
  test('maps lib sources under test/', () => {
    const libPath = path.join(root, 'lib/commons/text/sanitize.js');
    const testPath = resolvedUnitTestPathForLibFile(root, libPath);
    assert.equal(testPath, path.join(root, 'test/commons/text/sanitize.js'));
  });

  test('maps rule-matches files', () => {
    const libPath = path.join(root, 'lib/rules/foo-matches.js');
    const testPath = resolvedUnitTestPathForLibFile(root, libPath);
    assert.equal(testPath, path.join(root, 'test/rule-matches/foo-matches.js'));
  });
});

describe('resolvedIntegrationRuleJsonForLibRuleSpec', () => {
  test('maps rule specs to integration JSON paths', () => {
    const integration = resolvedIntegrationRuleJsonForLibRuleSpec(
      root,
      'lib/rules/button-name.json'
    );
    assert.equal(
      integration,
      path.join(root, 'test/integration/rules/button-name/button-name.json')
    );
  });
});

describe('resolvedGeneratedIntegrationTestPath', () => {
  test('maps rule integration json to generated test files', () => {
    const json = path.join(
      root,
      'test/integration/rules/accesskeys/accesskeys.json'
    );
    assert.equal(
      resolvedGeneratedIntegrationTestPath(root, json),
      path.join(root, 'tmp/integration-tests/accesskeys/accesskeys.test.js')
    );
  });

  test('maps rule integration html via sibling json', () => {
    const html = path.join(
      root,
      'test/integration/rules/landmark-unique/landmark-unique-fail.html'
    );
    assert.equal(
      resolvedGeneratedIntegrationTestPath(root, html),
      path.join(
        root,
        'tmp/integration-tests/landmark-unique/landmark-unique-fail.test.js'
      )
    );
  });

  test('maps fixture html to the parent rule test', () => {
    const html = path.join(
      root,
      'test/integration/rules/accesskeys/frame.html'
    );
    assert.equal(
      resolvedGeneratedIntegrationTestPath(root, html),
      path.join(root, 'tmp/integration-tests/accesskeys/accesskeys.test.js')
    );
  });
});

describe('resolvedFullIntegrationTestHtmlPaths', () => {
  test('maps html files directly', () => {
    const html = path.join(root, 'test/integration/full/async/async.html');
    assert.deepEqual(resolvedFullIntegrationTestHtmlPaths(root, html), [
      'test/integration/full/async/async.html'
    ]);
  });

  test('maps js files to sibling html', () => {
    const js = path.join(root, 'test/integration/full/async/async.js');
    assert.deepEqual(resolvedFullIntegrationTestHtmlPaths(root, js), [
      'test/integration/full/async/async.html'
    ]);
  });

  test('maps helper js files via html references', () => {
    const js = path.join(
      root,
      'test/integration/full/serializer/custom-source-serializer.js'
    );
    assert.deepEqual(resolvedFullIntegrationTestHtmlPaths(root, js), [
      'test/integration/full/serializer/serializer.html'
    ]);
  });

  test('maps frame fixtures to the parent html page', () => {
    const html = path.join(
      root,
      'test/integration/full/serializer/frames/level1.html'
    );
    assert.deepEqual(resolvedFullIntegrationTestHtmlPaths(root, html), [
      'test/integration/full/serializer/serializer.html'
    ]);
  });
});

describe('resolveWatchUnitTestPaths', () => {
  test('builds integration tests before running generated files', () => {
    const html = path.join(
      root,
      'test/integration/rules/accesskeys/accesskeys.html'
    );
    const { testPaths, needsIntegrationTestBuild } = resolveWatchUnitTestPaths(
      root,
      [html]
    );
    assert.equal(needsIntegrationTestBuild, true);
    assert.deepEqual(testPaths, [
      path.join(root, 'tmp/integration-tests/accesskeys/accesskeys.test.js')
    ]);
  });

  test('passes through direct unit test js files', () => {
    const unitTest = path.join(root, 'test/commons/text/sanitize.js');
    const {
      testPaths,
      needsIntegrationTestBuild,
      fullIntegrationTestHtmlPaths
    } = resolveWatchUnitTestPaths(root, [unitTest]);
    assert.equal(needsIntegrationTestBuild, false);
    assert.deepEqual(testPaths, [unitTest]);
    assert.deepEqual(fullIntegrationTestHtmlPaths, []);
  });

  test('resolves full integration html targets', () => {
    const html = path.join(root, 'test/integration/full/async/async.html');
    const { testPaths, fullIntegrationTestHtmlPaths } =
      resolveWatchUnitTestPaths(root, [html]);
    assert.deepEqual(testPaths, []);
    assert.deepEqual(fullIntegrationTestHtmlPaths, [
      'test/integration/full/async/async.html'
    ]);
  });

  test('ignores the webdriver harness script', () => {
    const harness = path.join(root, 'test/integration/full/test-webdriver.js');
    const result = resolveWatchUnitTestPaths(root, [harness]);
    assert.deepEqual(result.testPaths, []);
    assert.deepEqual(result.fullIntegrationTestHtmlPaths, []);
    assert.equal(result.needsIntegrationTestBuild, false);
  });
});

describe('partitionWatchTestPaths', () => {
  test('splits unit and integration test targets', () => {
    const unitTest = path.join(root, 'test/commons/text/sanitize.js');
    const integrationTest = path.join(
      root,
      'tmp/integration-tests/accesskeys/accesskeys.test.js'
    );
    const { unitTestPaths, integrationTestPaths } = partitionWatchTestPaths([
      integrationTest,
      unitTest
    ]);
    assert.deepEqual(unitTestPaths, [unitTest]);
    assert.deepEqual(integrationTestPaths, [integrationTest]);
  });
});

describe('describeWatchTestPlan', () => {
  test('lists unit tests before integration work', () => {
    const unitTest = path.join(root, 'test/commons/text/sanitize.js');
    const integrationTest = path.join(
      root,
      'tmp/integration-tests/accesskeys/accesskeys.test.js'
    );
    assert.equal(
      describeWatchTestPlan({
        unitTestPaths: [unitTest],
        integrationTestPaths: [integrationTest],
        needsIntegrationTestBuild: true
      }),
      'unit test + build integration tests + rule integration'
    );
  });

  test('lists full integration after rule integration', () => {
    assert.equal(
      describeWatchTestPlan({
        unitTestPaths: [],
        integrationTestPaths: [
          path.join(root, 'tmp/integration-tests/accesskeys/accesskeys.test.js')
        ],
        fullIntegrationTestHtmlPaths: [
          'test/integration/full/async/async.html'
        ],
        needsIntegrationTestBuild: true
      }),
      'build integration tests + rule integration + full integration'
    );
  });

  test('describes integration-only batches', () => {
    const integrationTest = path.join(
      root,
      'tmp/integration-tests/accesskeys/accesskeys.test.js'
    );
    assert.equal(
      describeWatchTestPlan({
        unitTestPaths: [],
        integrationTestPaths: [integrationTest],
        needsIntegrationTestBuild: true
      }),
      'build integration tests + rule integration'
    );
  });
});

describe('unitTestFilesArg', () => {
  test('returns repo-relative paths for WTR --files', () => {
    const abs = path.join(root, 'test/commons/text/sanitize.js');
    assert.equal(unitTestFilesArg(root, abs), 'test/commons/text/sanitize.js');
  });
});
