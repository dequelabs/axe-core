import { createBuildContext } from '../build-context.mjs';
import { validateAll } from '../validate-files.mjs';
import { runAddLocaleNewLang } from '../add-locale-build.mjs';
import { deriveLangSuffixes } from './argv.mjs';
import { root } from './root.mjs';
import { runConfigureAll } from './configure-all.mjs';
import { runEsbuildCore } from './esbuild-core.mjs';
import { runFullBuild } from './full-build.mjs';

/**
 * @param {ReturnType<import('./argv.mjs').parseBuildArgv>} parsed
 */
export async function runConfigureCommand(parsed) {
  const ctx = createBuildContext(root);
  const langs = deriveLangSuffixes(parsed);
  await runConfigureAll(ctx, langs, parsed.tags);
}

/**
 * @param {ReturnType<import('./argv.mjs').parseBuildArgv>} parsed
 */
export async function runTranslateCommand(parsed) {
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

export async function runValidateCommand() {
  const ctx = createBuildContext(root);
  if (!validateAll(ctx)) {
    process.exitCode = 1;
  }
}

export { runFullBuild };
