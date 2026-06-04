/**
 * WTR config for interactive browser debugging.
 * Extends wtr.config.mjs but launches a visible (non-headless) Chrome window
 * and uses Mocha's built-in HTML reporter so test results render directly in
 * the browser (same as Karma's debug.html page).
 *
 * Usage:
 *   npm run test:debug -- --files 'test/core/public/finish-run.js'
 *   The browser opens after pressing 'D' and shows a link to the test file.
 */
import baseConfig, { buildChromeLauncher } from './wtr.config.mjs';

export default {
  ...baseConfig,
  browsers: [buildChromeLauncher({ headless: false })],
  testFramework: {
    config: {
      ui: 'bdd',
      timeout: 4000,
      reporter: 'html'
    }
  }
};
