import fs from 'node:fs';
import path from 'node:path';
import { transformSync } from '@babel/core';
import { globSync } from 'glob';

/**
 * @param {ReturnType<import('../build-context.mjs').createBuildContext>} ctx
 */
export function runBabel(ctx) {
  const babelConfigFile = path.join(ctx.root, '.babelrc');
  const babelOpts = {
    cwd: ctx.root,
    configFile: babelConfigFile,
    compact: true
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
