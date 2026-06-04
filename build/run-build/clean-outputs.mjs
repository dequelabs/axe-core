import fs from 'node:fs';
import path from 'node:path';
import { globSync } from 'glob';

/**
 * @param {ReturnType<import('../build-context.mjs').createBuildContext>} ctx
 */
export function cleanOutputs(ctx) {
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
  const gatherInternals = path.join(ctx.root, 'gather-internals.js');
  if (fs.existsSync(gatherInternals)) {
    fs.unlinkSync(gatherInternals);
  }
  const walkTreeTmp = path.join(ctx.root, 'tmp/walk-tree.js');
  if (fs.existsSync(walkTreeTmp)) {
    fs.unlinkSync(walkTreeTmp);
  }
}
