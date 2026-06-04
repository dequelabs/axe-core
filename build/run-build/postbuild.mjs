import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

/**
 * @param {ReturnType<import('../build-context.mjs').createBuildContext>} ctx
 */
export function runPostbuild(ctx) {
  execSync('npm run postbuild', {
    cwd: ctx.root,
    stdio: 'inherit',
    env: { ...process.env }
  });
}

/**
 * @param {ReturnType<import('../build-context.mjs').createBuildContext>} ctx
 * @param {string[]} langs
 */
export function runBytesize(ctx, langs) {
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
