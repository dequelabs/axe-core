import fs from 'node:fs';
import path from 'node:path';
import {
  RULE_SPEC_JSON_RE,
  WATCH_MAX_AUTO_TESTS,
  hasUnitTestForLibFile,
  projectRelPath,
  describeWatchTestPlan,
  partitionWatchTestPaths,
  resolvedGeneratedIntegrationTestPath,
  resolvedIntegrationRuleJsonForLibRuleSpec,
  resolvedUnitTestPathForLibFile
} from './watch-helpers.mjs';

/**
 * Decide rebuild plan and targeted tests for a batch of lib/build file changes.
 * @param {string} projectRoot
 * @param {string[]} changedPaths
 */
export function analyzeLibBuildChanges(projectRoot, changedPaths) {
  const libSourceChanges = [];
  const ruleSpecChanges = [];

  for (const changedPath of changedPaths) {
    if (!changedPath) {
      continue;
    }
    const absPath = path.resolve(
      path.isAbsolute(changedPath)
        ? changedPath
        : path.join(projectRoot, changedPath)
    );
    const norm = absPath.replace(/\\/g, '/');
    const rel = projectRelPath(projectRoot, changedPath);

    if (norm.endsWith('/lib/core/base/metadata-function-map.js')) {
      continue;
    }
    if (RULE_SPEC_JSON_RE.test(rel)) {
      ruleSpecChanges.push({ absPath, rel });
      continue;
    }
    if (norm.includes('/lib/')) {
      libSourceChanges.push({ absPath, rel });
    }
  }

  const testableChanges = libSourceChanges.length + ruleSpecChanges.length;
  const skipTests = testableChanges > WATCH_MAX_AUTO_TESTS;

  /** @type {string[]} */
  const testPaths = [];
  if (!skipTests) {
    const seen = new Set();
    for (const { absPath } of libSourceChanges) {
      if (!hasUnitTestForLibFile(projectRoot, absPath)) {
        continue;
      }
      const testPath = resolvedUnitTestPathForLibFile(projectRoot, absPath);
      if (testPath && !seen.has(testPath)) {
        seen.add(testPath);
        testPaths.push(testPath);
      }
    }
    for (const { rel } of ruleSpecChanges) {
      const integrationJson = resolvedIntegrationRuleJsonForLibRuleSpec(
        projectRoot,
        rel
      );
      if (!integrationJson || !fs.existsSync(integrationJson)) {
        continue;
      }
      const generatedPath = resolvedGeneratedIntegrationTestPath(
        projectRoot,
        integrationJson
      );
      if (generatedPath && !seen.has(generatedPath)) {
        seen.add(generatedPath);
        testPaths.push(generatedPath);
      }
    }
  }

  const rels = changedPaths
    .filter(Boolean)
    .map(p => projectRelPath(projectRoot, p));

  let plan = 'rebuild';
  if (skipTests) {
    plan = 'rebuild (batch; skip tests)';
  } else if (testPaths.length > 0) {
    const { unitTestPaths, integrationTestPaths } =
      partitionWatchTestPaths(testPaths);
    const testPlan = describeWatchTestPlan({
      unitTestPaths,
      integrationTestPaths,
      needsIntegrationTestBuild: integrationTestPaths.length > 0
    });
    plan = `rebuild + ${testPlan}`;
  } else if (testableChanges === 1) {
    plan = 'rebuild (no test file)';
  }

  return {
    rels,
    plan,
    testPaths
  };
}
