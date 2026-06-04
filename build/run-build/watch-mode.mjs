import fs from 'node:fs';
import path from 'node:path';
import { root } from './root.mjs';
import { runFullBuild } from './full-build.mjs';
import {
  RULE_SPEC_JSON_RE,
  WATCH_DEBOUNCE_MS,
  WATCH_HTTP_PORT,
  hasUnitTestForLibFile,
  isTcpPortListening,
  killActiveKarma,
  projectRelPath,
  resolvedIntegrationRuleJsonForLibRuleSpec,
  runKarmaUnitTests,
  spawnWatchHttpServer,
  waitForTcpPortListening
} from './watch-helpers.mjs';

/**
 * @param {string} projectRoot
 * @param {string[]} changedPaths
 */
function analyzeLibBuildChanges(projectRoot, changedPaths) {
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
  const skipTests = testableChanges > 1;

  let willRunLibTest = false;
  let libAbsPath = null;
  if (!skipTests && libSourceChanges.length === 1) {
    libAbsPath = libSourceChanges[0].absPath;
    willRunLibTest = hasUnitTestForLibFile(projectRoot, libAbsPath);
  }

  let willRunRuleIntegration = false;
  let ruleIntegrationTestPath = null;
  if (!skipTests && ruleSpecChanges.length === 1) {
    ruleIntegrationTestPath = resolvedIntegrationRuleJsonForLibRuleSpec(
      projectRoot,
      ruleSpecChanges[0].rel
    );
    willRunRuleIntegration = Boolean(
      ruleIntegrationTestPath && fs.existsSync(ruleIntegrationTestPath)
    );
  }

  const rels = changedPaths
    .filter(Boolean)
    .map(p => projectRelPath(projectRoot, p));

  let plan = 'rebuild';
  if (skipTests && testableChanges > 1) {
    plan = 'rebuild (batch; skip tests)';
  } else if (willRunLibTest) {
    plan = 'rebuild + unit test';
  } else if (willRunRuleIntegration) {
    plan = 'rebuild + rule integration';
  } else if (libSourceChanges.length === 1) {
    plan = 'rebuild (no test file)';
  } else if (ruleSpecChanges.length === 1) {
    plan = 'rebuild (no integration test)';
  }

  return {
    rels,
    plan,
    willRunLibTest,
    libAbsPath,
    willRunRuleIntegration,
    ruleIntegrationTestPath
  };
}

/**
 * @param {ReturnType<import('./argv.mjs').parseBuildArgv>} parsed
 */
export async function runWatchMode(parsed) {
  const { default: chokidar } = await import('chokidar');
  const chalk = (await import('chalk')).default;

  let httpServerChild = null;
  const stopWatchHttpServer = () => {
    if (httpServerChild && !httpServerChild.killed) {
      httpServerChild.kill('SIGTERM');
      httpServerChild = null;
    }
  };

  const portBusy = await isTcpPortListening(WATCH_HTTP_PORT);
  if (portBusy) {
    console.log(
      `${chalk.dim('watch:')} port ${WATCH_HTTP_PORT} in use; using existing server`
    );
  } else {
    httpServerChild = spawnWatchHttpServer(root);
    httpServerChild.on('error', err => {
      console.error('watch: failed to start http-server:', err.message);
    });
    try {
      await waitForTcpPortListening(WATCH_HTTP_PORT);
    } catch (e) {
      stopWatchHttpServer();
      throw e;
    }
    console.log(
      `${chalk.dim('watch:')} http-server at http://127.0.0.1:${WATCH_HTTP_PORT}/ (npm start)`
    );
  }

  const onWatchExit = () => {
    killActiveKarma();
    stopWatchHttpServer();
  };
  process.once('SIGINT', () => {
    onWatchExit();
    process.exit(128 + 2);
  });
  process.once('SIGTERM', () => {
    onWatchExit();
    process.exit(143);
  });
  process.on('exit', onWatchExit);

  let libBuildRunning = false;
  let libBuildPending = false;
  /** @type {Set<string>} */
  let libBuildBatch = new Set();
  let libBuildTimer = null;

  let testRunning = false;
  let testPending = false;
  /** @type {Set<string>} */
  let testBatch = new Set();
  let testTimer = null;

  const runLibBuildBatch = async changedPaths => {
    const {
      rels,
      plan,
      willRunLibTest,
      libAbsPath,
      willRunRuleIntegration,
      ruleIntegrationTestPath
    } = analyzeLibBuildChanges(root, changedPaths);

    if (rels.length) {
      const label =
        rels.length > 3 ? `${rels.slice(0, 3).join(', ')}…` : rels.join(', ');
      console.log(`${chalk.dim('watch:')} ${label} ${chalk.dim('→')} ${plan}`);
    }

    await runFullBuild(parsed);

    try {
      const { notify } = await import('node-notifier');
      notify({
        title: 'Axe-core',
        message: 'Build complete',
        sound: 'Pop',
        timeout: 2
      });
    } catch {
      /* optional */
    }

    if (willRunLibTest && libAbsPath) {
      await runKarmaUnitTests(root, libAbsPath);
    }
    if (willRunRuleIntegration && ruleIntegrationTestPath) {
      await runKarmaUnitTests(root, ruleIntegrationTestPath);
    }
  };

  const flushLibBuildBatch = async () => {
    libBuildTimer = null;
    if (libBuildRunning) {
      libBuildPending = true;
      return;
    }
    libBuildRunning = true;
    try {
      do {
        libBuildPending = false;
        const paths = Array.from(libBuildBatch);
        libBuildBatch = new Set();
        try {
          await runLibBuildBatch(paths);
        } catch (e) {
          console.error(e);
          process.exitCode = 1;
        }
      } while (libBuildPending || libBuildBatch.size > 0);
    } finally {
      libBuildRunning = false;
    }
  };

  const scheduleLibBuild = changedPath => {
    if (changedPath) {
      libBuildBatch.add(changedPath);
    }
    if (libBuildTimer) {
      clearTimeout(libBuildTimer);
    }
    libBuildTimer = setTimeout(flushLibBuildBatch, WATCH_DEBOUNCE_MS);
  };

  const flushTestBatch = async () => {
    testTimer = null;
    if (testRunning) {
      testPending = true;
      return;
    }
    testRunning = true;
    try {
      do {
        testPending = false;
        const paths = Array.from(testBatch);
        testBatch = new Set();
        if (!paths.length) {
          continue;
        }
        const rels = paths.map(p => projectRelPath(root, p));
        const label =
          rels.length > 3 ? `${rels.slice(0, 3).join(', ')}…` : rels.join(', ');
        const plan =
          paths.length > 1 ? `unit tests (${paths.length} files)` : 'unit test';
        console.log(
          `${chalk.dim('watch:')} ${label} ${chalk.dim('→')} ${plan}`
        );
        try {
          const absPaths = paths.map(p =>
            path.resolve(path.isAbsolute(p) ? p : path.join(root, p))
          );
          await runKarmaUnitTests(root, absPaths);
        } catch (e) {
          console.error(e);
          process.exitCode = 1;
        }
      } while (testPending || testBatch.size > 0);
    } finally {
      testRunning = false;
    }
  };

  const scheduleTestRun = changedPath => {
    if (changedPath) {
      testBatch.add(changedPath);
    }
    if (testTimer) {
      clearTimeout(testTimer);
    }
    testTimer = setTimeout(flushTestBatch, WATCH_DEBOUNCE_MS);
  };

  chokidar
    .watch(['lib', 'build'], {
      cwd: root,
      ignoreInitial: true,
      /** chokidar 4+ does not expand globs; watch directories instead */
      ignored: fp => {
        const abs = path.resolve(
          path.isAbsolute(fp) ? fp : path.join(root, fp)
        );
        const rel = path.relative(path.resolve(root), abs).replace(/\\/g, '/');
        if (rel === 'lib/core/base/metadata-function-map.js') {
          return true;
        }
        if (rel === 'build') {
          return false;
        }
        if (rel.startsWith('build/')) {
          return !rel.endsWith('.mjs');
        }
        return false;
      }
    })
    .on('all', (event, p) => {
      scheduleLibBuild(p);
    });

  chokidar
    .watch('test', { cwd: root, ignoreInitial: true })
    .on('all', (event, p) => {
      scheduleTestRun(p);
    });

  try {
    await flushLibBuildBatch();
    await new Promise(() => {});
  } catch (e) {
    onWatchExit();
    throw e;
  }
}
