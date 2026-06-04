import { createBuildContext } from '../build-context.mjs';
import { validateAll } from '../validate-files.mjs';
import { runAriaSupported } from '../aria-supported-build.mjs';
import { runAddLocaleTemplate } from '../add-locale-build.mjs';
import { deriveLangSuffixes } from './argv.mjs';
import { root } from './root.mjs';
import { cleanOutputs } from './clean-outputs.mjs';
import { runMetadataFunctionMap } from './metadata-function-map.mjs';
import { runEsbuildCore, runEsbuildGatherInternals } from './esbuild-core.mjs';
import { runBabel } from './babel-transform.mjs';
import { runConcatEngine, runUglify } from './concat-uglify.mjs';
import { runConfigureAll } from './configure-all.mjs';
import { runPostbuild, runBytesize } from './postbuild.mjs';

/**
 * @param {ReturnType<import('./argv.mjs').parseBuildArgv>} parsed
 */
export async function runFullBuild(parsed) {
  const { log } = parsed;
  const step = label => {
    if (log) {
      console.log(`build: ${label}`);
    }
  };
  const started = log ? Date.now() : 0;

  if (log) {
    console.log('\nbuild: starting…');
  }

  const ctx = createBuildContext(root);
  const langs = deriveLangSuffixes(parsed);
  const pkg = ctx.readJSON('package.json');
  const year = new Date().getFullYear();

  step('cleaning outputs');
  cleanOutputs(ctx);

  step('validating');
  if (!validateAll(ctx)) {
    throw new Error('Validation failed');
  }

  step('metadata function map');
  runMetadataFunctionMap(ctx);
  step('esbuild core');
  await runEsbuildCore(ctx);
  step('esbuild gather-internals');
  await runEsbuildGatherInternals(ctx);
  step('configure rules and checks');
  await runConfigureAll(ctx, langs, parsed.tags);
  step('babel');
  runBabel(ctx);
  step('concat');
  runConcatEngine(ctx, langs, pkg, year);
  step('uglify');
  runUglify(ctx, langs);
  step('aria supported docs');
  await runAriaSupported(ctx.root, langs, 'unsupported');
  step('locale template');
  runAddLocaleTemplate(ctx);
  step('postbuild');
  runPostbuild(ctx);
  step('bytesize');
  runBytesize(ctx, langs);

  if (log) {
    const seconds = ((Date.now() - started) / 1000).toFixed(1);
    console.log(`build: done (${seconds}s)\n`);
  }
}
