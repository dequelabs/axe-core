#!/usr/bin/env node
/**
 * axe-core build driver (replaces Gruntfile.js).
 */
import fs from 'node:fs';
import net from 'node:net';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync, spawn } from 'node:child_process';
import { build as esbuildBuild } from 'esbuild';
import { transformSync } from '@babel/core';
import { minify } from 'uglify-js';
import { globSync } from 'glob';
import { createBuildContext, templateProcess } from './build-context.mjs';
import { validateAll } from './validate-files.mjs';
import buildRules from './configure.mjs';
import { runAriaSupported } from './aria-supported-build.mjs';
import {
  runAddLocaleTemplate,
  runAddLocaleNewLang
} from './add-locale-build.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');

process.env.NODE_NO_HTTP2 = '1';

/**
 * Same mapping as `test/karma.conf.js` (testFiles branch) for lib sources.
 * @param {string} projectRoot
 * @param {string} libAbsPath
 * @returns {string | null} Absolute path to the test file Karma would load
 */
function resolvedUnitTestPathForLibFile(projectRoot, libAbsPath) {
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
function hasUnitTestForLibFile(projectRoot, libAbsPath) {
  const testPath = resolvedUnitTestPathForLibFile(projectRoot, libAbsPath);
  return testPath !== null && fs.existsSync(testPath);
}

/** `lib/rules/<rule-id>.json` (top-level rule specs only) */
const RULE_SPEC_JSON_RE = /^lib\/rules\/[^/]+\.json$/;

/**
 * @param {string} projectRoot
 * @param {string} relFromRoot project-relative path, `/` separators
 * @returns {string | null} Absolute path to `test/integration/rules/{id}/{id}.json`
 */
function resolvedIntegrationRuleJsonForLibRuleSpec(projectRoot, relFromRoot) {
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
 * Karma preprocessors in `test/karma.conf.js` use repo-relative globs; pass
 * `testFiles=` as a project-relative `/` path when the file is under the repo.
 * @param {string} projectRoot
 * @param {string} absolutePath
 * @returns {string}
 */
function karmaTestFilesArg(projectRoot, absolutePath) {
  const rel = path
    .relative(path.resolve(projectRoot), path.resolve(absolutePath))
    .replace(/\\/g, '/');
  if (!rel || rel.startsWith('..')) {
    return path.resolve(absolutePath);
  }
  return rel;
}

const WATCH_HTTP_PORT = 9876;

/**
 * @param {number} port
 * @param {string} [host='127.0.0.1']
 * @returns {Promise<boolean>} true if something accepts TCP connections
 */
function isTcpPortListening(port, host = '127.0.0.1') {
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
async function waitForTcpPortListening(port, opts = {}) {
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
 * Same flags as `npm start` in package.json (http-server for Karma / integration).
 * @param {string} projectRoot
 * @returns {import('node:child_process').ChildProcess}
 */
function spawnWatchHttpServer(projectRoot) {
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

/**
 * @param {string[]} argv
 */
export function parseBuildArgv(argv) {
  const args = argv.slice(2);
  const positionals = [];
  const opts = {
    lang: null,
    allLang: false,
    tags: null,
    watch: false
  };

  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '--watch' || a === '-w') {
      opts.watch = true;
    } else if (a === '--all-lang' || a === '--allLang') {
      opts.allLang = true;
    } else if (a.startsWith('--lang=')) {
      opts.lang = a.slice('--lang='.length);
    } else if (a === '--lang') {
      opts.lang = args[++i] ?? '';
    } else if (a.startsWith('--tags=')) {
      opts.tags = a.slice('--tags='.length);
    } else if (a === '--tags') {
      opts.tags = args[++i] ?? '';
    } else if (!a.startsWith('-')) {
      positionals.push(a);
    }
  }

  const sub = positionals[0] || 'build';
  return { sub, positionals, ...opts };
}

/**
 * @param {{ lang: string | null, allLang: boolean }} opts
 */
export function deriveLangSuffixes(opts) {
  if (opts.lang) {
    return opts.lang.split(/[,;]/g).map(s => {
      const lang = s.trim();
      return lang !== 'en' ? `.${lang}` : '';
    });
  }
  if (opts.allLang) {
    const localeFiles = fs.readdirSync(path.join(root, 'locales'));
    const langs = localeFiles
      .filter(file => !file.startsWith('_') && file.endsWith('.json'))
      .map(file => `.${file.replace('.json', '')}`);
    langs.unshift('');
    return langs;
  }
  return [''];
}

function cleanOutputs(ctx) {
  const rm = rel => {
    const abs = path.join(ctx.root, rel);
    if (fs.existsSync(abs)) {
      fs.rmSync(abs, { recursive: true, force: true });
    }
  };
  rm('dist');
  rm('tmp/core');
  for (const f of globSync('tmp/rules*.js', { cwd: ctx.root, posix: true })) {
    fs.unlinkSync(path.join(ctx.root, f));
  }
  for (const f of globSync('axe*.js', { cwd: ctx.root, posix: true })) {
    fs.unlinkSync(path.join(ctx.root, f));
  }
}

function toTitleCase(str) {
  return str.replace(/-\w/g, txt => {
    return txt.charAt(1).toUpperCase() + txt.substr(2).toLowerCase();
  });
}

function runMetadataFunctionMap(ctx) {
  const destRel = 'lib/core/base/metadata-function-map.js';
  const destAbs = path.join(ctx.root, destRel);
  const srcGlobs = [
    'lib/checks/**/*-{evaluate,after}.js',
    'lib/rules/**/*-matches.js'
  ];
  const pathPosix = path.posix;

  let outFile =
    '// This file is automatically generated using build/run-build.mjs\n';

  const map = {};
  for (const globPath of srcGlobs) {
    globSync(globPath, { cwd: ctx.root, nodir: true, posix: true }).forEach(
      filePath => {
        const relativePath = pathPosix.relative(
          pathPosix.dirname(destRel),
          filePath
        );
        const filename = pathPosix.basename(filePath, '.js');
        const functionName = toTitleCase(filename);
        outFile += `import ${functionName} from '${relativePath}';\n`;
        map[filename] = functionName;
      }
    );
  }

  outFile += `\nconst metadataFunctionMap = {\n`;
  outFile += Object.keys(map)
    .sort()
    .map(key => `  '${key}': ${map[key]}`)
    .join(',\n');
  outFile += `\n};\n\nexport default metadataFunctionMap;\n`;
  fs.writeFileSync(destAbs, outFile, 'utf8');
}

async function runEsbuildCore(ctx) {
  const entry = path.join(ctx.root, 'lib/core/core.js');
  const outdir = path.join(ctx.root, 'tmp/core');
  fs.mkdirSync(outdir, { recursive: true });
  await esbuildBuild({
    entryPoints: [entry],
    outfile: path.join(outdir, 'core.js'),
    minify: false,
    bundle: true
  });
}

function runBabel(ctx) {
  const babelConfigFile = path.join(ctx.root, '.babelrc');
  const babelOpts = {
    cwd: ctx.root,
    configFile: babelConfigFile
  };

  const indexIn = path.join(ctx.root, 'lib/core/index.js');
  const indexSrc = fs.readFileSync(indexIn, 'utf8');
  const indexOut = transformSync(indexSrc, {
    ...babelOpts,
    filename: indexIn
  });
  if (!indexOut || !indexOut.code) {
    throw new Error('Babel failed for lib/core/index.js');
  }
  const indexDest = path.join(ctx.root, 'tmp/core/index.js');
  fs.mkdirSync(path.dirname(indexDest), { recursive: true });
  fs.writeFileSync(indexDest, indexOut.code, 'utf8');

  const tmpJs = globSync('tmp/**/*.js', { cwd: ctx.root, posix: true }).sort();
  for (const rel of tmpJs) {
    const abs = path.join(ctx.root, rel);
    const src = fs.readFileSync(abs, 'utf8');
    const out = transformSync(src, {
      ...babelOpts,
      filename: abs
    });
    if (!out || !out.code) {
      throw new Error(`Babel failed for ${rel}`);
    }
    fs.writeFileSync(abs, out.code, 'utf8');
  }
}

function readCoreChunksInOrder(ctx, pkg, year) {
  const dir = path.join(ctx.root, 'tmp/core');
  const names = fs
    .readdirSync(dir)
    .filter(n => n.endsWith('.js'))
    .sort();
  const ordered = [];
  if (names.includes('index.js')) {
    ordered.push('index.js');
  }
  for (const n of names) {
    if (n !== 'index.js') {
      ordered.push(n);
    }
  }
  return ordered.map(n =>
    templateProcess(fs.readFileSync(path.join(dir, n), 'utf8'), { pkg, year })
  );
}

function runConcatEngine(ctx, langs, pkg, year) {
  const introRaw = fs.readFileSync(
    path.join(ctx.root, 'lib/intro.stub'),
    'utf8'
  );
  const intro = templateProcess(introRaw, { pkg, year });
  const outro = fs.readFileSync(path.join(ctx.root, 'lib/outro.stub'), 'utf8');
  const coreChunks = readCoreChunksInOrder(ctx, pkg, year);

  for (const suffix of langs) {
    const rulesPath = path.join(ctx.root, `tmp/rules${suffix}.js`);
    const rulesSrc = fs.readFileSync(rulesPath, 'utf8');
    const parts = [intro, ...coreChunks, rulesSrc, outro];
    const dest = path.join(ctx.root, `axe${suffix}.js`);
    fs.writeFileSync(dest, parts.join('\n'), 'utf8');
  }
}

function runUglify(ctx, langs) {
  /* eslint-disable camelcase -- uglify-js API option names */
  const beautifyOpts = {
    mangle: false,
    compress: false,
    output: {
      beautify: true,
      ascii_only: true,
      indent_level: 2,
      braces: true,
      quote_style: 1,
      comments: /^\/*! axe/
    }
  };

  const minifyOpts = {
    output: {
      comments: /^\/*! axe/
    },
    mangle: {
      reserved: ['commons', 'utils', 'axe', 'window', 'document']
    }
  };

  for (const suffix of langs) {
    const mainPath = path.join(ctx.root, `axe${suffix}.js`);
    const src = fs.readFileSync(mainPath, 'utf8');
    const beautified = minify(src, beautifyOpts);
    if (beautified.error) {
      throw beautified.error;
    }
    fs.writeFileSync(mainPath, beautified.code, 'utf8');

    const min = minify(beautified.code, minifyOpts);
    if (min.error) {
      throw min.error;
    }
    fs.writeFileSync(
      path.join(ctx.root, `axe${suffix}.min.js`),
      min.code,
      'utf8'
    );
  }
}

/* eslint-enable camelcase */

function runPostbuild(ctx) {
  execSync('npm run postbuild', {
    cwd: ctx.root,
    stdio: 'inherit',
    env: { ...process.env }
  });
}

function runBytesize(ctx, langs) {
  for (const suffix of langs) {
    for (const ext of ['.js', '.min.js']) {
      const name = `axe${suffix}${ext}`;
      const abs = path.join(ctx.root, name);
      if (!fs.existsSync(abs)) {
        continue;
      }
      const bytes = fs.statSync(abs).size;
      console.log(`${name}: ${bytes} bytes`);
    }
  }
}

/**
 * @param {ReturnType<typeof createBuildContext>} ctx
 * @param {string[]} langs
 * @param {string | null} tags
 */
async function runConfigureAll(ctx, langs, tags) {
  const formatMod = await import('./shared/format.mjs');
  const format = formatMod.default;

  await Promise.all(
    langs.map(
      suffix =>
        new Promise((resolve, reject) => {
          const destAuto = `tmp/rules${suffix}.js`;
          const destDesc =
            suffix === ''
              ? 'doc/rule-descriptions.md'
              : `doc/rule-descriptions${suffix}.md`;

          const parts = destAuto.split('.');
          const options = {
            rules: ['lib/rules/**/*.json'],
            checks: ['lib/checks/**/*.json'],
            misc: ['lib/misc/**/*.json'],
            blacklist: ['metadata'],
            tags: tags || ''
          };
          if (parts.length > 2) {
            options.locale = parts[parts.length - 2];
          }

          buildRules(ctx, options, async result => {
            try {
              ctx.writeFile(destAuto, `axe._load(${result.auto});`);
              const formatted = await format(result.descriptions, destDesc);
              ctx.writeFile(destDesc, formatted);
              resolve();
            } catch (e) {
              reject(e);
            }
          });
        })
    )
  );
}

async function runFullBuild(parsed) {
  const ctx = createBuildContext(root);
  const langs = deriveLangSuffixes(parsed);
  const pkg = ctx.readJSON('package.json');
  const year = new Date().getFullYear();

  cleanOutputs(ctx);

  if (!validateAll(ctx)) {
    throw new Error('Validation failed');
  }

  runMetadataFunctionMap(ctx);
  await runEsbuildCore(ctx);
  await runConfigureAll(ctx, langs, parsed.tags);
  runBabel(ctx);
  runConcatEngine(ctx, langs, pkg, year);
  runUglify(ctx, langs);
  await runAriaSupported(ctx.root, langs, 'unsupported');
  runAddLocaleTemplate(ctx);
  runPostbuild(ctx);
  runBytesize(ctx, langs);
}

async function runConfigureCommand(parsed) {
  const ctx = createBuildContext(root);
  const langs = deriveLangSuffixes(parsed);
  fs.mkdirSync(path.join(ctx.root, 'tmp/core'), { recursive: true });
  await esbuildBuild({
    entryPoints: [path.join(ctx.root, 'lib/core/core.js')],
    outfile: path.join(ctx.root, 'tmp/core/core.js'),
    minify: false,
    bundle: true
  });
  await runConfigureAll(ctx, langs, parsed.tags);
}

async function runTranslateCommand(parsed) {
  const ctx = createBuildContext(root);
  if (!parsed.lang) {
    throw new Error('translate requires --lang=<code>');
  }
  if (!validateAll(ctx)) {
    throw new Error('Validation failed');
  }
  await runEsbuildCore(ctx);
  runAddLocaleNewLang(ctx, parsed.lang);
}

async function runValidateCommand() {
  const ctx = createBuildContext(root);
  if (!validateAll(ctx)) {
    process.exitCode = 1;
  }
}

/**
 * File watch + optional http-server + rebuild / Karma (see `npm run develop`).
 * @param {ReturnType<typeof parseBuildArgv>} parsed
 */
async function runWatchMode(parsed) {
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

  let timer = null;
  const run = async changedPath => {
    try {
      let absPath = null;
      let willRunLibTest = false;
      let willRunRuleIntegration = false;
      let ruleIntegrationTestPath = null;
      if (changedPath) {
        absPath = path.resolve(
          path.isAbsolute(changedPath)
            ? changedPath
            : path.join(root, changedPath)
        );
        const rootResolved = path.resolve(root);
        const norm = absPath.replace(/\\/g, '/');
        const rel =
          path.relative(rootResolved, absPath).replace(/\\/g, '/') ||
          changedPath;
        const isGeneratedMetadataMap = norm.endsWith(
          '/lib/core/base/metadata-function-map.js'
        );
        const isRuleSpecJson = RULE_SPEC_JSON_RE.test(rel);
        ruleIntegrationTestPath = resolvedIntegrationRuleJsonForLibRuleSpec(
          root,
          rel
        );
        willRunRuleIntegration = Boolean(
          ruleIntegrationTestPath && fs.existsSync(ruleIntegrationTestPath)
        );
        const isLibSourceChange =
          norm.includes('/lib/') && !isGeneratedMetadataMap && !isRuleSpecJson;
        willRunLibTest =
          isLibSourceChange && hasUnitTestForLibFile(root, absPath);
        const plan = willRunLibTest
          ? 'rebuild + unit test'
          : willRunRuleIntegration
            ? 'rebuild + rule integration'
            : isLibSourceChange
              ? 'rebuild (no test file)'
              : isRuleSpecJson
                ? 'rebuild (no integration test)'
                : 'rebuild';
        console.log(`${chalk.dim('watch:')} ${rel} ${chalk.dim('→')} ${plan}`);
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
      if (willRunLibTest && absPath) {
        const tf = karmaTestFilesArg(root, absPath);
        execSync(`npm run test:unit -- testFiles=${JSON.stringify(tf)}`, {
          cwd: root,
          stdio: 'inherit'
        });
      }
      if (willRunRuleIntegration && ruleIntegrationTestPath) {
        const tf = karmaTestFilesArg(root, ruleIntegrationTestPath);
        execSync(`npm run test:unit -- testFiles=${JSON.stringify(tf)}`, {
          cwd: root,
          stdio: 'inherit'
        });
      }
    } catch (e) {
      console.error(e);
      process.exitCode = 1;
    }
  };

  const schedule = (event, p) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      timer = null;
      run(p);
    }, 150);
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
    .on('all', schedule);

  chokidar
    .watch('test', { cwd: root, ignoreInitial: true })
    .on('all', (ev, p) => {
      try {
        const absPath = path.resolve(
          path.isAbsolute(p) ? p : path.join(root, p)
        );
        const rel =
          path.relative(path.resolve(root), absPath).replace(/\\/g, '/') || p;
        console.log(
          `${chalk.dim('watch:')} ${rel} ${chalk.dim('→')} unit test`
        );
        const tf = karmaTestFilesArg(root, absPath);
        execSync(`npm run test:unit -- testFiles=${JSON.stringify(tf)}`, {
          cwd: root,
          stdio: 'inherit'
        });
      } catch {
        process.exitCode = 1;
      }
    });

  try {
    await run(null);
    await new Promise(() => {});
  } catch (e) {
    stopWatchHttpServer();
    throw e;
  }
}

async function main() {
  const parsed = parseBuildArgv(process.argv);

  if (parsed.watch && parsed.sub !== 'build') {
    console.error('--watch is only supported for the default build');
    process.exitCode = 1;
    return;
  }

  if (parsed.watch) {
    await runWatchMode(parsed);
    return;
  }

  switch (parsed.sub) {
    case 'build':
      await runFullBuild(parsed);
      break;
    case 'configure':
      await runConfigureCommand(parsed);
      break;
    case 'translate':
      await runTranslateCommand(parsed);
      break;
    case 'validate':
      await runValidateCommand();
      break;
    default:
      console.error(`Unknown command: ${parsed.sub}`);
      process.exitCode = 1;
  }
}

main().catch(err => {
  console.error(err);
  process.exitCode = 1;
});
