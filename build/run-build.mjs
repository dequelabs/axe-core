#!/usr/bin/env node
/**
 * axe-core build driver (replaces Gruntfile.js).
 */
process.env.NODE_NO_HTTP2 = '1';

export { parseBuildArgv, deriveLangSuffixes } from './run-build/argv.mjs';

import { parseBuildArgv } from './run-build/argv.mjs';
import {
  runConfigureCommand,
  runFullBuild,
  runTranslateCommand,
  runValidateCommand
} from './run-build/commands.mjs';
import { runWatchMode } from './run-build/watch-mode.mjs';

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
