const path = require('path');
const fs = require('fs');
const { AxeBuilder } = require('@axe-core/webdriverjs');
const { getWebdriver } = require('../get-webdriver');
const { assert } = require('chai');
const { globSync } = require('glob');

describe('aria-practices', function () {
  // Use path.resolve rather than require.resolve because APG package.json main file does not exist
  const apgPath = path.resolve(__dirname, '../../node_modules/aria-practices/');
  const filePaths = globSync(
    `${apgPath}/content/patterns/*/**/examples/*.html`,
    { posix: true }
  );
  const testFiles = filePaths.map(
    fileName => fileName.split('/aria-practices/content/patterns/')[1]
  );

  const addr = `http://localhost:9876/node_modules/aria-practices/`;
  let driver, axeSource;
  this.timeout(50000);
  this.retries(3);

  before(async () => {
    const axePath = require.resolve('../../axe.js');
    axeSource = fs.readFileSync(axePath, 'utf8');
    driver = getWebdriver();
  });

  after(async () => {
    await driver.close();
  });

  const disabledRules = {
    '*': [
      'color-contrast',
      'target-size',
      'heading-order', // w3c/aria-practices#2119
      'scrollable-region-focusable' // w3c/aria-practices#2114
    ]
  };

  const skippedPages = [
    'toolbar/examples/help.html', // Embedded into another page
    'tabs/examples/tabs-actions.html' // dequelabs/axe-core#4584
  ];

  it('finds examples', () => {
    assert.isTrue(testFiles.length > 0);
  });

  testFiles
    .filter(filePath => !skippedPages.includes(filePath))
    .forEach(filePath => {
      it(`finds no issue in "${filePath}"`, async () => {
        await driver.get(`${addr}content/patterns/${filePath}`);

        const builder = new AxeBuilder(driver, axeSource)
          // Support table has no title and has duplicate ids
          .exclude('#at-support')
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
          .disableRules([
            ...disabledRules['*'],
            ...(disabledRules[filePath] || [])
          ]);

        const { violations } = await builder.analyze();
        const issues = violations.map(({ id, nodes }) => ({
          id,
          issues: nodes.length
        }));
        assert.lengthOf(issues, 0, issues.map(({ id }) => id).join(', '));
      });
    });
});
