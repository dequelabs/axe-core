var path = require('path');
var fs = require('fs');
var template = fs.readFileSync('test/act/runner.js', 'utf-8');

var actRepoDir = 'node_modules/act-rules.github.io/';
var testcaseFilePath = path.resolve(actRepoDir, 'testcases.json');
var testcaseContent = require(testcaseFilePath);
var testcases = testcaseContent.testcases;

function getTestCases(actRules) {
  var tests = {};
  var actEntries = Object.keys(actRules);

  actEntries.forEach(function(ruleId) {
    var ruleInfo = actRules[ruleId];
    var ruleTestCases = testcases.filter(function(testcase) {
      return testcase.ruleId === ruleId;
    });
    ruleTestCases.forEach(function(testcase) {
      var testcasePath = path.resolve(actRepoDir, testcase.relativePath);
      testcase.html = fs.readFileSync(testcasePath, 'utf-8');
    });

    tests[ruleId] = Object.assign(
      {
        testcases: ruleTestCases
      },
      ruleInfo
    );
  });
  return tests;
}

/**
 * Turn each rule.json integration test JSON into a js file using
 * the runner.js script. This allow us to load the JSON files in
 * the karma config and they'll run as js files.
 */
var createIntegrationPreprocessor = function(logger) {
  var log = logger.create('preprocessor.act');

  return function(actRulesJson, file, done) {
    try {
      log.debug('Processing "%s".', file.originalPath);
      var actRules = JSON.parse(actRulesJson);
      var testCases = getTestCases(actRules);
      var testContent = JSON.stringify(testCases, null, 2);
      var testFileContent = template.replace('{}; /*tests*/', testContent);

      done(null, testFileContent);
    } catch (e) {
      console.log('e:', e);
      done(e, null);
    }
  };
};

createIntegrationPreprocessor.$inject = ['logger'];

// PUBLISH DI MODULE
module.exports = {
  'preprocessor:act': ['factory', createIntegrationPreprocessor]
};
