import fs from 'node:fs';
import net from 'node:net';
import path from 'node:path';
import { spawn } from 'node:child_process';

/** `lib/rules/<rule-id>.json` (top-level rule specs only) */
export const RULE_SPEC_JSON_RE = /^lib\/rules\/[^/]+\.json$/;

export const WATCH_HTTP_PORT = 9876;

export const WATCH_DEBOUNCE_MS = 400;

/** Above this many lib/rule changes in one batch, skip auto-tests (e.g. branch swap). */
export const WATCH_MAX_AUTO_TESTS = 10;

/** @type {import('node:child_process').ChildProcess | null} */
let activeTestChild = null;

/** @type {import('node:child_process').ChildProcess | null} */
let activeBuildChild = null;

export function killActiveTest() {
  if (activeTestChild && !activeTestChild.killed) {
    activeTestChild.kill('SIGTERM');
    activeTestChild = null;
  }
}

export function killActiveBuild() {
  if (activeBuildChild && !activeBuildChild.killed) {
    activeBuildChild.kill('SIGTERM');
    activeBuildChild = null;
  }
}

/** @returns {boolean} */
export function isActiveBuild() {
  return activeBuildChild !== null && !activeBuildChild.killed;
}

/** @returns {boolean} */
export function isActiveTest() {
  return activeTestChild !== null && !activeTestChild.killed;
}

/**
 * Run a full build in a child process so watch mode can terminate it on SIGINT.
 * @param {string} projectRoot
 * @param {ReturnType<import('./argv.mjs').parseBuildArgv>} parsed
 * @returns {Promise<void>}
 */
export function runFullBuildSubprocess(projectRoot, parsed) {
  return new Promise((resolve, reject) => {
    killActiveBuild();
    const buildScript = path.join(projectRoot, 'build/run-build.mjs');
    const args = [buildScript, 'build'];
    if (parsed.log) {
      args.push('--log');
    }
    if (parsed.allLang) {
      args.push('--all-lang');
    }
    if (parsed.lang) {
      args.push(`--lang=${parsed.lang}`);
    }
    if (parsed.tags) {
      args.push(`--tags=${parsed.tags}`);
    }
    const child = spawn(process.execPath, args, {
      cwd: projectRoot,
      stdio: 'inherit',
      env: { ...process.env }
    });
    activeBuildChild = child;
    child.on('error', err => {
      activeBuildChild = null;
      reject(err);
    });
    child.on('exit', (code, signal) => {
      activeBuildChild = null;
      if (signal) {
        reject(new Error(`Build terminated by ${signal}`));
        return;
      }
      if (code !== 0) {
        reject(new Error(`Build failed with exit code ${code}`));
        return;
      }
      resolve();
    });
  });
}

/**
 * @param {string} projectRoot
 * @param {string | string[]} testAbsPaths
 * @returns {Promise<void>}
 */
export function runUnitTests(projectRoot, testAbsPaths) {
  const paths = [].concat(testAbsPaths);
  const testFilesValue = paths
    .map(p => unitTestFilesArg(projectRoot, p))
    .join(',');

  return new Promise((resolve, reject) => {
    killActiveTest();
    const child = spawn(
      'npm',
      ['run', 'test:unit', '--', `testFiles=${testFilesValue}`],
      {
        cwd: projectRoot,
        stdio: 'inherit',
        env: { ...process.env }
      }
    );
    activeTestChild = child;
    child.on('error', err => {
      activeTestChild = null;
      reject(err);
    });
    child.on('exit', (code, signal) => {
      activeTestChild = null;
      if (signal) {
        reject(new Error(`Unit tests terminated by ${signal}`));
        return;
      }
      if (code !== 0) {
        reject(new Error(`Unit tests failed with exit code ${code}`));
        return;
      }
      resolve();
    });
  });
}

/**
 * @param {string} projectRoot
 * @param {string} changedPath
 * @returns {string}
 */
export function projectRelPath(projectRoot, changedPath) {
  const absPath = path.resolve(
    path.isAbsolute(changedPath)
      ? changedPath
      : path.join(projectRoot, changedPath)
  );
  return (
    path.relative(path.resolve(projectRoot), absPath).replace(/\\/g, '/') ||
    changedPath
  );
}

/**
 * Same mapping as the unit test runner `testFiles` option for lib sources.
 * @param {string} projectRoot
 * @param {string} libAbsPath
 * @returns {string | null} Absolute path to the unit test file for a lib source
 */
export function resolvedUnitTestPathForLibFile(projectRoot, libAbsPath) {
  const rel = path
    .relative(projectRoot, path.resolve(libAbsPath))
    .replace(/\\/g, '/');
  if (!rel.startsWith('lib/')) {
    return null;
  }
  const basename = path.posix.basename(rel);
  let testRel;
  if (basename.includes('-matches.js')) {
    testRel = path.posix.join('test', 'rule-matches', basename);
  } else {
    testRel = rel.replace(/^lib\//, 'test/');
    if (rel.includes('-evaluate.js')) {
      testRel = testRel.replace('-evaluate.js', '.js');
    }
  }
  return path.join(projectRoot, ...testRel.split('/'));
}

/**
 * @param {string} projectRoot
 * @param {string} libAbsPath
 */
export function hasUnitTestForLibFile(projectRoot, libAbsPath) {
  const testPath = resolvedUnitTestPathForLibFile(projectRoot, libAbsPath);
  return testPath !== null && fs.existsSync(testPath);
}

/**
 * @param {string} projectRoot
 * @param {string} relFromRoot project-relative path, `/` separators
 * @returns {string | null} Absolute path to `test/integration/rules/{id}/{id}.json`
 */
export function resolvedIntegrationRuleJsonForLibRuleSpec(
  projectRoot,
  relFromRoot
) {
  if (!RULE_SPEC_JSON_RE.test(relFromRoot)) {
    return null;
  }
  const ruleId = path.posix.basename(relFromRoot, '.json');
  if (!ruleId) {
    return null;
  }
  return path.join(
    projectRoot,
    'test',
    'integration',
    'rules',
    ruleId,
    `${ruleId}.json`
  );
}

/**
 * Unit test `testFiles=` uses repo-relative globs; pass a project-relative `/`
 * path when the file is under the repo.
 * @param {string} projectRoot
 * @param {string} absolutePath
 * @returns {string}
 */
export function unitTestFilesArg(projectRoot, absolutePath) {
  const rel = path
    .relative(path.resolve(projectRoot), path.resolve(absolutePath))
    .replace(/\\/g, '/');
  if (!rel || rel.startsWith('..')) {
    return path.resolve(absolutePath);
  }
  return rel;
}

/**
 * @param {number} port
 * @param {string} [host='127.0.0.1']
 * @returns {Promise<boolean>} true if something accepts TCP connections
 */
export function isTcpPortListening(port, host = '127.0.0.1') {
  return new Promise(resolve => {
    const socket = net.createConnection({ port, host });
    const finish = ok => {
      socket.removeAllListeners();
      socket.destroy();
      resolve(ok);
    };
    socket.setTimeout(400);
    socket.once('connect', () => finish(true));
    socket.once('timeout', () => finish(false));
    socket.once('error', () => {
      finish(false);
    });
  });
}

/**
 * @param {number} port
 * @param {{ timeoutMs?: number, intervalMs?: number }} [opts]
 */
export async function waitForTcpPortListening(port, opts = {}) {
  const timeoutMs = opts.timeoutMs ?? 12000;
  const intervalMs = opts.intervalMs ?? 50;
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (await isTcpPortListening(port)) {
      return;
    }
    await new Promise(r => setTimeout(r, intervalMs));
  }
  throw new Error(`Timed out waiting for a server on port ${port}`);
}

/**
 * Same flags as `npm start` in package.json (http-server for unit tests / integration).
 * @param {string} projectRoot
 * @returns {import('node:child_process').ChildProcess}
 */
export function spawnWatchHttpServer(projectRoot) {
  const args = ['-a', '', '-p', String(WATCH_HTTP_PORT), '--silent'];
  const binName =
    process.platform === 'win32' ? 'http-server.cmd' : 'http-server';
  const localBin = path.join(projectRoot, 'node_modules', '.bin', binName);
  if (fs.existsSync(localBin)) {
    return spawn(localBin, args, {
      cwd: projectRoot,
      stdio: 'inherit',
      env: { ...process.env }
    });
  }
  return spawn('npx', ['http-server', ...args], {
    cwd: projectRoot,
    stdio: 'inherit',
    shell: process.platform === 'win32',
    env: { ...process.env }
  });
}
