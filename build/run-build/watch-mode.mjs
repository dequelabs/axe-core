import fs from 'node:fs';
import path from 'node:path';
import { root } from './root.mjs';
import {
  RULE_SPEC_JSON_RE,
  WATCH_DEBOUNCE_MS,
  WATCH_HTTP_PORT,
  WATCH_MAX_AUTO_TESTS,
  hasUnitTestForLibFile,
  isActiveBuild,
  isActiveTest,
  isTcpPortListening,
  killActiveBuild,
  killActiveTest,
  projectRelPath,
  resolvedIntegrationRuleJsonForLibRuleSpec,
  resolvedUnitTestPathForLibFile,
  runFullBuildSubprocess,
  runUnitTests,
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
      const integrationPath = resolvedIntegrationRuleJsonForLibRuleSpec(
        projectRoot,
        rel
      );
      if (
        integrationPath &&
        fs.existsSync(integrationPath) &&
        !seen.has(integrationPath)
      ) {
        seen.add(integrationPath);
        testPaths.push(integrationPath);
      }
    }
  }

  const rels = changedPaths
    .filter(Boolean)
    .map(p => projectRelPath(projectRoot, p));

  let plan = 'rebuild';
  if (skipTests) {
    plan = 'rebuild (batch; skip tests)';
  } else if (testPaths.length === 1) {
    plan = testPaths[0].replace(/\\/g, '/').includes('/integration/')
      ? 'rebuild + rule integration'
      : 'rebuild + unit test';
  } else if (testPaths.length > 1) {
    plan = `rebuild + unit tests (${testPaths.length} files)`;
  } else if (testableChanges === 1) {
    plan = 'rebuild (no test file)';
  }

  return {
    rels,
    plan,
    testPaths
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

  let shuttingDown = false;
  let shutdownExitCode = 128 + 2;
  let forceExitOnSigint = false;
  let workSuperseded = false;

  let pipelineRunning = false;
  let pipelineScheduled = false;
  let needsInitialBuild = true;
  /** @type {string[] | null} */
  let inFlightLibPaths = null;
  /** @type {Set<string>} */
  let libBatch = new Set();
  /** @type {Set<string>} */
  let testBatch = new Set();
  let pipelineTimer = null;

  const onWatchExit = () => {
    shuttingDown = true;
    if (pipelineTimer) {
      clearTimeout(pipelineTimer);
      pipelineTimer = null;
    }
    killActiveTest();
    killActiveBuild();
    stopWatchHttpServer();
  };

  const handlePipelineError = err => {
    if (shuttingDown || workSuperseded) {
      return;
    }
    console.error(err);
    process.exitCode = 1;
  };

  const exitIfShuttingDown = () => {
    if (shuttingDown) {
      process.exit(process.exitCode || shutdownExitCode);
    }
  };

  const supersedeInFlightLibWork = () => {
    if (!inFlightLibPaths?.length) {
      return;
    }
    for (const changedPath of inFlightLibPaths) {
      libBatch.add(changedPath);
    }
  };

  process.on('SIGINT', () => {
    shutdownExitCode = 128 + 2;
    if (forceExitOnSigint) {
      process.exit(shutdownExitCode);
    }
    forceExitOnSigint = true;
    onWatchExit();
    if (!pipelineRunning) {
      process.exit(shutdownExitCode);
    }
  });
  process.once('SIGTERM', () => {
    shutdownExitCode = 128 + 15;
    onWatchExit();
    if (!pipelineRunning) {
      process.exit(shutdownExitCode);
    }
  });
  process.on('exit', onWatchExit);

  const runLibBuildBatch = async changedPaths => {
    inFlightLibPaths = changedPaths;
    try {
      const { rels, plan, testPaths } = analyzeLibBuildChanges(
        root,
        changedPaths
      );

      if (rels.length) {
        const label =
          rels.length > 3 ? `${rels.slice(0, 3).join(', ')}…` : rels.join(', ');
        console.log(
          `${chalk.dim('watch:')} ${label} ${chalk.dim('→')} ${plan}`
        );
      }

      await runFullBuildSubprocess(root, parsed);

      if (shuttingDown) {
        return;
      }
      if (workSuperseded) {
        workSuperseded = false;
        return;
      }

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

      if (testPaths.length > 0) {
        await runUnitTests(root, testPaths);
      }
    } finally {
      inFlightLibPaths = null;
    }
  };

  const runTestOnlyBatch = async paths => {
    const rels = paths.map(p => projectRelPath(root, p));
    const label =
      rels.length > 3 ? `${rels.slice(0, 3).join(', ')}…` : rels.join(', ');
    const plan =
      paths.length > 1 ? `unit tests (${paths.length} files)` : 'unit test';
    console.log(`${chalk.dim('watch:')} ${label} ${chalk.dim('→')} ${plan}`);
    const absPaths = paths.map(p =>
      path.resolve(path.isAbsolute(p) ? p : path.join(root, p))
    );
    await runUnitTests(root, absPaths);
  };

  const handleSupersededWork = () => {
    if (!workSuperseded) {
      return false;
    }
    workSuperseded = false;
    return true;
  };

  const flushPipeline = async () => {
    pipelineTimer = null;
    if (pipelineRunning) {
      pipelineScheduled = true;
      return;
    }
    pipelineRunning = true;
    try {
      while (!shuttingDown) {
        if (needsInitialBuild) {
          needsInitialBuild = false;
          try {
            await runLibBuildBatch([]);
          } catch (e) {
            if (handleSupersededWork()) {
              continue;
            }
            handlePipelineError(e);
          }
          continue;
        }
        if (libBatch.size > 0) {
          const paths = Array.from(libBatch);
          libBatch = new Set();
          try {
            await runLibBuildBatch(paths);
          } catch (e) {
            if (handleSupersededWork()) {
              continue;
            }
            handlePipelineError(e);
          }
          continue;
        }
        if (testBatch.size > 0) {
          const paths = Array.from(testBatch);
          testBatch = new Set();
          try {
            await runTestOnlyBatch(paths);
          } catch (e) {
            if (handleSupersededWork()) {
              continue;
            }
            handlePipelineError(e);
          }
          continue;
        }
        break;
      }
    } finally {
      pipelineRunning = false;
      if (pipelineScheduled) {
        pipelineScheduled = false;
        flushPipeline();
      } else {
        exitIfShuttingDown();
      }
    }
  };

  const schedulePipeline = () => {
    if (shuttingDown) {
      return;
    }
    if (pipelineTimer) {
      clearTimeout(pipelineTimer);
    }
    pipelineTimer = setTimeout(flushPipeline, WATCH_DEBOUNCE_MS);
  };

  const scheduleLibBuild = changedPath => {
    if (changedPath) {
      libBatch.add(changedPath);
    }
    if (
      pipelineRunning &&
      (isActiveBuild() || (isActiveTest() && inFlightLibPaths))
    ) {
      workSuperseded = true;
      supersedeInFlightLibWork();
      if (parsed.log && isActiveBuild()) {
        console.log(
          `${chalk.dim('watch:')} cancelling build (superseded by new changes)`
        );
      }
      killActiveBuild();
      if (inFlightLibPaths) {
        killActiveTest();
      }
    }
    schedulePipeline();
  };

  const scheduleTestRun = changedPath => {
    if (changedPath) {
      testBatch.add(changedPath);
    }
    schedulePipeline();
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
    await flushPipeline();
    await new Promise(() => {});
  } catch (e) {
    onWatchExit();
    throw e;
  }
}
