import assert from 'node:assert/strict';
import path from 'node:path';
import { describe, test } from 'node:test';
import { root } from './root.mjs';
import {
  RULE_SPEC_JSON_RE,
  projectRelPath,
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

describe('unitTestFilesArg', () => {
  test('returns repo-relative paths for karma testFiles', () => {
    const abs = path.join(root, 'test/commons/text/sanitize.js');
    assert.equal(unitTestFilesArg(root, abs), 'test/commons/text/sanitize.js');
  });
});
