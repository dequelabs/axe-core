import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { build as esbuildBuild } from 'esbuild';

/**
 * @param {ReturnType<import('../build-context.mjs').createBuildContext>} ctx
 */
export async function runEsbuildCore(ctx) {
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

/**
 * @param {string} entry
 * @param {import('esbuild').Metafile} metafile
 * @param {{ max: number, maxSize: number }} limits
 */
function assertEsbuildImportLimits(entry, metafile, limits) {
  const { max, maxSize } = limits;
  const entries = Object.entries(metafile.inputs);

  assert(
    entries.length <= max,
    `${entry} imported too many files (max: ${max}): ${entries.length}`
  );
  for (const [key, value] of entries) {
    assert(
      value.bytes <= maxSize,
      `${key} import size too large (max: ${maxSize}): ${value.bytes}`
    );
  }
}

/** Bundle gather-internals for extension injection and unit tests. */
export async function runEsbuildGatherInternals(ctx) {
  const tmpDir = path.join(ctx.root, 'tmp');
  fs.mkdirSync(tmpDir, { recursive: true });

  // Build so that we can use it in unit tests
  await esbuildBuild({
    entryPoints: [path.join(ctx.root, 'lib/gather-internals/walk-tree.js')],
    outfile: path.join(tmpDir, 'walk-tree.js'),
    minify: false,
    bundle: true,
    globalName: '_gatherInternals'
  });

  const mainEntry = path.join(ctx.root, 'lib/gather-internals/main.js');
  const gatherResult = await esbuildBuild({
    entryPoints: [mainEntry],
    outfile: path.join(ctx.root, 'gather-internals.js'),
    minify: false,
    bundle: true,
    // esbuild doesn't support returning from an iife
    // @see https://github.com/evanw/esbuild/issues/2277
    banner: { js: '(() => {' },
    footer: { js: 'return elementInternalsMap;\n})();' },
    globalName: 'elementInternalsMap',
    metafile: true
  });
  assertEsbuildImportLimits(mainEntry, gatherResult.metafile, {
    max: 10,
    maxSize: 4000
  });
}
