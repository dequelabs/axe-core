#!/usr/bin/env node
/**
 * Run QUnit HTML tests in a headless browser (replaces grunt-contrib-qunit).
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pathToFileURL } from 'node:url';
import puppeteer from 'puppeteer';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testHtml = path.join(__dirname, 'test', 'test.html');
const fileUrl = pathToFileURL(testHtml).href;

const browser = await puppeteer.launch({
  headless: true,
  args: ['--disable-web-security', '--allow-file-access-from-files']
});

try {
  const page = await browser.newPage();
  let hadPageRuntimeError = false;
  page.on('pageerror', err => {
    hadPageRuntimeError = true;
    console.error(err);
  });
  page.on('console', msg => {
    if (msg.type() === 'error') {
      hadPageRuntimeError = true;
      console.error(msg.text());
    }
  });

  await page.evaluateOnNewDocument(() => {
    window.__qUnitSummaryPromise = new Promise((resolve, reject) => {
      const t = setTimeout(
        () => reject(new Error('QUnit tests timed out')),
        15_000
      );
      window.addEventListener('load', () => {
        if (typeof QUnit === 'undefined') {
          clearTimeout(t);
          reject(new Error('QUnit did not load'));
          return;
        }
        QUnit.done(details => {
          clearTimeout(t);
          resolve(details);
        });
      });
    });
  });

  await page.goto(fileUrl, { waitUntil: 'load', timeout: 30_000 });

  const summary = await page.evaluate(() => window.__qUnitSummaryPromise);

  console.log(
    `QUnit: ${summary.passed} passed, ${summary.failed} failed (${summary.runtime}ms)`
  );
  if (summary.failed > 0 || hadPageRuntimeError) {
    process.exitCode = 1;
  }
} finally {
  await browser.close();
}
