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
 * @returns {Promise<void>}
 */
export function runBuildIntegrationTests(projectRoot) {
  return new Promise((resolve, reject) => {
    killActiveBuild();
    const child = spawn('npm', ['run', 'build:integration-tests'], {
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
        reject(new Error(`Integration test build terminated by ${signal}`));
        return;
      }
      if (code !== 0) {
        reject(
          new Error(`Integration test build failed with exit code ${code}`)
        );
        return;
      }
      resolve();
    });
  });
}

/**
 * @param {string} projectRoot
 * @param {string | string[]} htmlRelPaths repo-relative HTML paths under test/integration/full
 * @returns {Promise<void>}
 */
export function runFullIntegrationTests(projectRoot, htmlRelPaths) {
  const paths = []
    .concat(htmlRelPaths)
    .map(rel => rel.replace(/\\/g, '/').replace(/^\//, ''));
  const args = ['run', 'integration', '--', 'browser=chrome'];
  for (const rel of paths) {
    args.push(`url=${rel}`);
  }

  return new Promise((resolve, reject) => {
    killActiveTest();
    const child = spawn('npm', args, {
      cwd: projectRoot,
      stdio: 'inherit',
      env: { ...process.env }
    });
    activeTestChild = child;
    child.on('error', err => {
      activeTestChild = null;
      reject(err);
    });
    child.on('exit', (code, signal) => {
      activeTestChild = null;
      if (signal) {
        reject(new Error(`Full integration tests terminated by ${signal}`));
        return;
      }
      if (code !== 0) {
        reject(
          new Error(`Full integration tests failed with exit code ${code}`)
        );
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
  const fileArgs = paths
    .map(p => unitTestFilesArg(projectRoot, p))
    .flatMap(file => ['--files', file]);

  return new Promise((resolve, reject) => {
    killActiveTest();
    const child = spawn('npm', ['run', 'test:unit', '--', ...fileArgs], {
      cwd: projectRoot,
      stdio: 'inherit',
      env: { ...process.env }
    });
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
 * Maps lib sources to their corresponding unit test file paths.
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

/** @param {string} rel project-relative path, `/` separators */
export function isFullIntegrationTestSource(rel) {
  return (
    rel.startsWith('test/integration/full/') &&
    rel !== 'test/integration/full/test-webdriver.js'
  );
}

/**
 * @param {string} projectRoot
 * @param {string} rel project-relative path under test/integration/full
 * @returns {string[]} repo-relative HTML paths to run
 */
function listFullIntegrationHtmlInDir(dirAbs) {
  return fs
    .readdirSync(dirAbs)
    .filter(name => /\.(html|xhtml)$/i.test(name))
    .map(name => path.join(dirAbs, name));
}

/**
 * @param {string} projectRoot
 * @param {string} rel project-relative path under test/integration/full/.../frames/
 * @returns {string[]} repo-relative HTML paths
 */
function resolvedFullIntegrationHtmlForFramesPath(projectRoot, rel) {
  const framesIdx = rel.indexOf('/frames/');
  if (framesIdx === -1) {
    return [];
  }
  const parentRel = rel.slice(0, framesIdx);
  const parentDir = path.join(projectRoot, parentRel);
  if (!fs.existsSync(parentDir)) {
    return [];
  }
  return listFullIntegrationHtmlInDir(parentDir).map(htmlAbs =>
    projectRelPath(projectRoot, htmlAbs)
  );
}

/**
 * @param {string} projectRoot
 * @param {string} dirAbs
 * @param {string} basename changed file basename
 * @returns {string[]} repo-relative HTML paths
 */
function resolvedFullIntegrationHtmlForAsset(projectRoot, dirAbs, basename) {
  const stem = basename.replace(/\.[^.]+$/, '');
  for (const ext of ['.html', '.xhtml']) {
    const candidate = path.join(dirAbs, stem + ext);
    if (fs.existsSync(candidate)) {
      return [projectRelPath(projectRoot, candidate)];
    }
  }

  const htmlFiles = listFullIntegrationHtmlInDir(dirAbs);
  const referenced = htmlFiles.filter(htmlAbs => {
    const content = fs.readFileSync(htmlAbs, 'utf8');
    return content.includes(basename);
  });
  if (referenced.length) {
    return referenced.map(htmlAbs => projectRelPath(projectRoot, htmlAbs));
  }
  if (htmlFiles.length === 1) {
    return [projectRelPath(projectRoot, htmlFiles[0])];
  }
  return [];
}

/**
 * @param {string} projectRoot
 * @param {string} changedPath
 * @returns {string[]} repo-relative HTML paths to run via test-webdriver
 */
export function resolvedFullIntegrationTestHtmlPaths(projectRoot, changedPath) {
  const rel = projectRelPath(projectRoot, changedPath);
  if (!isFullIntegrationTestSource(rel)) {
    return [];
  }
  if (/\.(html|xhtml)$/i.test(rel)) {
    if (rel.includes('/frames/')) {
      return resolvedFullIntegrationHtmlForFramesPath(projectRoot, rel);
    }
    return [rel];
  }
  if (rel.includes('/frames/')) {
    return resolvedFullIntegrationHtmlForFramesPath(projectRoot, rel);
  }
  const dirAbs = path.dirname(
    path.resolve(
      path.isAbsolute(changedPath)
        ? changedPath
        : path.join(projectRoot, changedPath)
    )
  );
  return resolvedFullIntegrationHtmlForAsset(
    projectRoot,
    dirAbs,
    path.basename(rel)
  );
}

/** @param {string} rel project-relative path, `/` separators */
export function isIntegrationRuleTestSource(rel) {
  return (
    rel.startsWith('test/integration/rules/') &&
    (rel.endsWith('.json') || rel.endsWith('.html'))
  );
}

/**
 * Maps a rule integration *.json / *.html source to the generated WTR test file
 * under tmp/integration-tests/.
 * @param {string} projectRoot
 * @param {string} changedPath
 * @returns {string | null}
 */
export function resolvedGeneratedIntegrationTestPath(projectRoot, changedPath) {
  const rel = projectRelPath(projectRoot, changedPath);
  if (!isIntegrationRuleTestSource(rel)) {
    return null;
  }
  if (rel.endsWith('.json')) {
    const rulesRel = rel.slice('test/integration/rules/'.length);
    return path.join(
      projectRoot,
      'tmp/integration-tests',
      rulesRel.replace(/\.json$/, '.test.js')
    );
  }
  const jsonRel = rel.replace(/\.html$/, '.json');
  const jsonAbs = path.join(projectRoot, jsonRel);
  if (fs.existsSync(jsonAbs)) {
    return resolvedGeneratedIntegrationTestPath(projectRoot, jsonAbs);
  }
  const afterRules = rel.slice('test/integration/rules/'.length);
  const ruleId = afterRules.split('/')[0];
  if (!ruleId) {
    return null;
  }
  return path.join(
    projectRoot,
    'tmp/integration-tests',
    ruleId,
    `${ruleId}.test.js`
  );
}

/**
 * @param {string} projectRoot
 * @param {string[]} changedAbsPaths
 */
export function resolveWatchUnitTestPaths(projectRoot, changedAbsPaths) {
  /** @type {string[]} */
  const testPaths = [];
  /** @type {string[]} */
  const fullIntegrationTestHtmlPaths = [];
  const seen = new Set();
  const seenFullHtml = new Set();
  let needsIntegrationTestBuild = false;

  for (const changedPath of changedAbsPaths) {
    const rel = projectRelPath(projectRoot, changedPath);
    if (isFullIntegrationTestSource(rel)) {
      for (const htmlRel of resolvedFullIntegrationTestHtmlPaths(
        projectRoot,
        changedPath
      )) {
        if (!seenFullHtml.has(htmlRel)) {
          seenFullHtml.add(htmlRel);
          fullIntegrationTestHtmlPaths.push(htmlRel);
        }
      }
      continue;
    }
    // Harness-only files (e.g. test-webdriver.js) live here too; they are not WTR tests.
    if (rel.startsWith('test/integration/full/')) {
      continue;
    }
    if (isIntegrationRuleTestSource(rel)) {
      needsIntegrationTestBuild = true;
      const generated = resolvedGeneratedIntegrationTestPath(
        projectRoot,
        changedPath
      );
      if (generated && !seen.has(generated)) {
        seen.add(generated);
        testPaths.push(generated);
      }
      continue;
    }
    if (rel.endsWith('.js')) {
      const abs = path.resolve(
        path.isAbsolute(changedPath)
          ? changedPath
          : path.join(projectRoot, changedPath)
      );
      if (!seen.has(abs)) {
        seen.add(abs);
        testPaths.push(abs);
      }
    }
  }

  return { testPaths, needsIntegrationTestBuild, fullIntegrationTestHtmlPaths };
}

/** @param {string} testAbsPath */
export function isGeneratedIntegrationTestPath(testAbsPath) {
  return testAbsPath.replace(/\\/g, '/').includes('/tmp/integration-tests/');
}

/** @param {string[]} testAbsPaths */
export function partitionWatchTestPaths(testAbsPaths) {
  const unitTestPaths = [];
  const integrationTestPaths = [];
  for (const testPath of testAbsPaths) {
    if (isGeneratedIntegrationTestPath(testPath)) {
      integrationTestPaths.push(testPath);
    } else {
      unitTestPaths.push(testPath);
    }
  }
  return { unitTestPaths, integrationTestPaths };
}

/**
 * @param {{
 *   unitTestPaths: string[];
 *   integrationTestPaths: string[];
 *   fullIntegrationTestHtmlPaths?: string[];
 *   needsIntegrationTestBuild?: boolean;
 * }} opts
 */
export function describeWatchTestPlan(opts) {
  const parts = [];
  if (opts.unitTestPaths.length) {
    parts.push(
      opts.unitTestPaths.length === 1
        ? 'unit test'
        : `unit tests (${opts.unitTestPaths.length} files)`
    );
  }
  if (opts.needsIntegrationTestBuild) {
    parts.push('build integration tests');
  }
  if (opts.integrationTestPaths.length) {
    parts.push(
      opts.integrationTestPaths.length === 1
        ? 'rule integration'
        : `rule integration (${opts.integrationTestPaths.length} files)`
    );
  }
  const fullIntegrationCount = opts.fullIntegrationTestHtmlPaths?.length ?? 0;
  if (fullIntegrationCount) {
    parts.push(
      fullIntegrationCount === 1
        ? 'full integration'
        : `full integration (${fullIntegrationCount} files)`
    );
  }
  return parts.join(' + ') || 'no runnable tests';
}

/**
 * Run unit tests first, then build and run rule integration tests when needed.
 * @param {string} projectRoot
 * @param {{
 *   unitTestPaths: string[];
 *   integrationTestPaths: string[];
 *   fullIntegrationTestHtmlPaths?: string[];
 *   needsIntegrationTestBuild?: boolean;
 * }} opts
 */
export async function runWatchTests(projectRoot, opts) {
  if (opts.unitTestPaths.length) {
    await runUnitTests(projectRoot, opts.unitTestPaths);
  }
  if (opts.needsIntegrationTestBuild) {
    await runBuildIntegrationTests(projectRoot);
  }
  if (opts.integrationTestPaths.length) {
    await runUnitTests(projectRoot, opts.integrationTestPaths);
  }
  if (opts.fullIntegrationTestHtmlPaths?.length) {
    await runFullIntegrationTests(
      projectRoot,
      opts.fullIntegrationTestHtmlPaths
    );
  }
}

/**
 * WTR `--files` expects repo-relative paths; pass a project-relative `/` path
 * when the file is under the repo.
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
