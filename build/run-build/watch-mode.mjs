import path from 'node:path';
import { analyzeLibBuildChanges } from './analyze-lib-build-changes.mjs';
import { root } from './root.mjs';
import { createWatchPipeline } from './watch-pipeline.mjs';
import {
  WATCH_DEBOUNCE_MS,
  WATCH_HTTP_PORT,
  isActiveBuild,
  isActiveTest,
  isTcpPortListening,
  killActiveBuild,
  killActiveTest,
  projectRelPath,
  describeWatchTestPlan,
  partitionWatchTestPaths,
  resolveWatchUnitTestPaths,
  runFullBuildSubprocess,
  runWatchTests,
  spawnWatchHttpServer,
  waitForTcpPortListening
} from './watch-helpers.mjs';

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
  let workSuperseded = false;

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

  const shutdownWatch = code => {
    if (shuttingDown) {
      process.exit(code);
    }
    shutdownExitCode = code;
    onWatchExit();
    process.exit(code);
  };

  process.on('SIGINT', () => {
    shutdownWatch(128 + 2);
  });
  process.once('SIGTERM', () => {
    shutdownWatch(128 + 15);
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
        const { unitTestPaths, integrationTestPaths } =
          partitionWatchTestPaths(testPaths);
        await runWatchTests(root, {
          unitTestPaths,
          integrationTestPaths,
          needsIntegrationTestBuild: integrationTestPaths.length > 0
        });
      }
    } finally {
      inFlightLibPaths = null;
    }
  };

  const runTestOnlyBatch = async paths => {
    const rels = paths.map(p => projectRelPath(root, p));
    const label =
      rels.length > 3 ? `${rels.slice(0, 3).join(', ')}…` : rels.join(', ');
    const absPaths = paths.map(p =>
      path.resolve(path.isAbsolute(p) ? p : path.join(root, p))
    );
    const {
      testPaths,
      needsIntegrationTestBuild,
      fullIntegrationTestHtmlPaths
    } = resolveWatchUnitTestPaths(root, absPaths);
    const { unitTestPaths, integrationTestPaths } =
      partitionWatchTestPaths(testPaths);
    const plan = describeWatchTestPlan({
      unitTestPaths,
      integrationTestPaths,
      fullIntegrationTestHtmlPaths,
      needsIntegrationTestBuild
    });
    console.log(`${chalk.dim('watch:')} ${label} ${chalk.dim('→')} ${plan}`);
    await runWatchTests(root, {
      unitTestPaths,
      integrationTestPaths,
      fullIntegrationTestHtmlPaths,
      needsIntegrationTestBuild
    });
  };

  const handleSupersededWork = () => {
    if (!workSuperseded) {
      return false;
    }
    workSuperseded = false;
    return true;
  };

  /**
   * @param {() => Promise<void>} runStep
   * @returns {Promise<boolean>} true when the step ran (continue the pipeline loop)
   */
  const runPipelineStep = async runStep => {
    try {
      await runStep();
    } catch (e) {
      if (handleSupersededWork()) {
        return true;
      }
      handlePipelineError(e);
    }
    return true;
  };

  /** @returns {Promise<boolean>} false when there is no more queued work */
  const drainPipelineQueue = async () => {
    if (needsInitialBuild) {
      needsInitialBuild = false;
      return runPipelineStep(() => runLibBuildBatch([]));
    }
    if (libBatch.size > 0) {
      const paths = Array.from(libBatch);
      libBatch = new Set();
      return runPipelineStep(() => runLibBuildBatch(paths));
    }
    if (testBatch.size > 0) {
      const paths = Array.from(testBatch);
      testBatch = new Set();
      return runPipelineStep(() => runTestOnlyBatch(paths));
    }
    return false;
  };

  const pipeline = createWatchPipeline({
    drain: drainPipelineQueue,
    shouldContinue: () => !shuttingDown,
    onIdle: exitIfShuttingDown
  });

  const flushPipeline = async () => {
    pipelineTimer = null;
    await pipeline.flushPipeline();
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
    if (pipeline.isRunning() && (isActiveBuild() || isActiveTest())) {
      workSuperseded = true;
      supersedeInFlightLibWork();
      if (parsed.log) {
        const action = isActiveBuild()
          ? 'cancelling build'
          : 'cancelling tests';
        console.log(
          `${chalk.dim('watch:')} ${action} (superseded by new changes)`
        );
      }
      killActiveBuild();
      killActiveTest();
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
