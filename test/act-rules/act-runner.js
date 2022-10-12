const path = require('path');
const fs = require('fs');
const chromedriver = require('chromedriver');
const AxeBuilder = require('@axe-core/webdriverjs');
const {
  getWebdriver,
  connectToChromeDriver
} = require('../aria-practices/run-server');
const { assert } = require('chai');

const port = 9515;
const axePath = require.resolve('../../axe.js');
const axeSource = fs.readFileSync(axePath, 'utf8');
const actPath = path.resolve(__dirname, '../../node_modules/wcag-act-rules/');
const testCaseJsonPath = path.resolve(
  actPath,
  './content-assets/wcag-act-rules/testcases.json'
);
const addr = `http://localhost:9876/node_modules/wcag-act-rules/content-assets/wcag-act-rules/`;
const testCaseJson = require(testCaseJsonPath);

module.exports = ({ id, title, axeRules, skipTests = [] }) => {
  describe(`${title} (${id})`, function () {
    const testcases = testCaseJson.testcases.filter(
      ({ ruleId }) => ruleId === id
    );
    this.timeout(50000);
    this.retries(3);

    let driver;
    before(async () => {
      chromedriver.start([`--port=${port}`]);
      await new Promise(r => setTimeout(r, 500));
      await connectToChromeDriver(port);
      driver = getWebdriver();
    });

    after(async () => {
      await driver.close();
      chromedriver.stop();
    });

    testcases.forEach(testcase => {
      const shouldRun =
        testcase.relativePath.match(/\.(xhtml|html?)$/) &&
        !skipTests.includes(testcase.testcaseId);

      (shouldRun ? it : xit)(testcase.testcaseTitle, async () => {
        await driver.get(`${addr}/${testcase.relativePath}`);
        const builder = new AxeBuilder(driver, axeSource);
        builder.withRules(axeRules);
        const results = await builder.analyze();

        if (testcase.expected !== 'failed') {
          assert.lengthOf(results.violations, 0, 'Expected 0 violations');
        } else {
          var issues = results.violations[0] || results.incomplete[0];
          assert.isDefined(issues, 'Expected violations or incomplete');
          assert.isAtLeast(issues.nodes.length, 1);
        }
      });
    });
  });
};
