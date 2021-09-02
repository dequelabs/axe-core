const path = require('path');
const fs = require('fs');
const { createServer } = require('http');
const express = require('express');
const chromedriver = require('chromedriver');
const AxeBuilder = require('@axe-core/webdriverjs');
const testListen = require('test-listen');
const { Webdriver, connectToChromeDriver } = require('./run-server');
const { assert } = require('chai');
const globby = require('globby');

describe('aria-practices', function () {
  const apgPath = path.resolve(__dirname, '../../node_modules/aria-practices/');
  const filePaths = globby.sync(`${apgPath}/examples/**/*.html`)
  const festFiles = filePaths.map(fileName => fileName.split('/aria-practices/examples/')[1])
  const port = 9515;
  let driver, server, addr, axeSource;
  this.timeout(50000);

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
    driver = Webdriver();
  });

  after(async () => {
    await driver.close();
    server.close();
    chromedriver.stop();
  });

  // TODO: Figure out which of these need to be addressed
  //   either in axe-core, or in aria-practices
  const disabledRules = {
    '*': [
      'color-contrast',
      'heading-order',
      'list',
      'scrollable-region-focusable',
      'region',
      'page-has-heading-one',
    ],
    'index.html': ['landmark-unique'],
    'button/button_idl.html': ['aria-allowed-attr'],
    'js/notice.html': ['landmark-one-main'],
    'listbox/listbox-grouped.html': [
      'aria-required-children',
      'aria-required-parent'
    ],
    'menubar/menubar-navigation.html': [
      'aria-allowed-role',
      'landmark-banner-is-top-level',
      'landmark-contentinfo-is-top-level',
    ],
    'toolbar/help.html': ['landmark-one-main'],
    'treeview/treeview-navigation.html': [
      'aria-allowed-role',
      'landmark-banner-is-top-level',
      'landmark-contentinfo-is-top-level'
    ]
  }

  // TODO: this timed out, figure out why
  const skippedPages = ['link/link.html'];

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
