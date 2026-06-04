import fs from 'node:fs';
import path from 'node:path';
import { minify } from 'uglify-js';
import { templateProcess } from '../build-context.mjs';

/**
 * @param {ReturnType<import('../build-context.mjs').createBuildContext>} ctx
 * @param {object} pkg
 * @param {number} year
 */
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

/**
 * @param {ReturnType<import('../build-context.mjs').createBuildContext>} ctx
 * @param {string[]} langs
 * @param {object} pkg
 * @param {number} year
 */
export function runConcatEngine(ctx, langs, pkg, year) {
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

/**
 * @param {ReturnType<import('../build-context.mjs').createBuildContext>} ctx
 * @param {string[]} langs
 */
export function runUglify(ctx, langs) {
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
