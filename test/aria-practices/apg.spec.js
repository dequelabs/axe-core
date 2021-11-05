const path = require('path');
const fs = require('fs');
const { createServer } = require('http');
const express = require('express');
const chromedriver = require('chromedriver');
const AxeBuilder = require('@axe-core/webdriverjs');
const testListen = require('test-listen');
const { getWebdriver, connectToChromeDriver } = require('./run-server');
const { assert } = require('chai');
const globby = require('globby');

describe('aria-practices', function () {
  const apgPath = path.resolve(__dirname, '../../node_modules/aria-practices/');
  const filePaths = globby.sync(`${apgPath}/examples/**/*.html`)
  const festFiles = filePaths.map(fileName => fileName.split('/aria-practices/examples/')[1])
  const port = 9515;
  let driver, server, addr, axeSource;
  this.timeout(50000);
  this.retries(3);

  before(async () => {
    const axePath = require.resolve('../../axe.js');
    axeSource = fs.readFileSync(axePath, 'utf8');
    chromedriver.start([`--port=${port}`]);
    await new Promise(r => setTimeout(r, 500));
    await connectToChromeDriver(port);

    const app = express();
    app.use(express.static(apgPath));
    server = createServer(app);
    addr = await testListen(server);
    driver = getWebdriver();
  });

  after(async () => {
    await driver.close();
    server.close();
    chromedriver.stop();
  });

  const disabledRules = {
    '*': [
      'color-contrast',
      'region', // dequelabs/axe-core#3260
      'heading-order', // APG issues
      'list', // APG issues
      'scrollable-region-focusable', // w3c/aria-practices#2114
    ],
    'feed/feedDisplay.html': ['page-has-heading-one'], // APG issue
    'index.html': ['landmark-unique'], // w3c/aria-practices#2115

    // "page within a page" type thing going on
    'menubar/menubar-navigation.html': [
      'aria-allowed-role',
      'landmark-banner-is-top-level',
      'landmark-contentinfo-is-top-level',
    ],
    // "page within a page" type thing going on
    'treeview/treeview-navigation.html': [
      'aria-allowed-role',
      'landmark-banner-is-top-level',
      'landmark-contentinfo-is-top-level'
    ]
  }

  // Not an actual content file
  const skippedPages = ['js/notice.html'];

  festFiles.forEach(filePath => {
    const test = skippedPages.includes(filePath) ? it.skip : it;
    test(`finds no issue in "${filePath}"`, async () => {
      await driver.get(`${addr}/examples/${filePath}`);
      
      const builder = new AxeBuilder(driver, axeSource);
      builder.disableRules([
        ...disabledRules['*'],
        ...(disabledRules[filePath] || []),
      ]);
      
      const { violations } = await builder.analyze();
      const issues = violations.map(({ id, nodes }) => ({ id, issues: nodes.length }))
      assert.deepEqual(issues, []);
    });
  });
});
