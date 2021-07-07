var path = require('path');
var fs = require('fs');
var template = fs.readFileSync(path.resolve(__dirname, 'runner.js'), 'utf-8');

var actRepoDir = 'node_modules/act-rules.github.io/';
var testcaseFilePath = path.resolve(actRepoDir, 'testcases.json');
var testcaseContent = require(testcaseFilePath);
var testcases = testcaseContent.testcases;

createActPreprocessor.$inject = ['logger'];
// Simple Karma preprocessor, takes JSON, outputs a JS file that can run tests
function createActPreprocessor(logger) {
  var log = logger.create('preprocessor.act');

  return function(actRuleJson, file, done) {
    try {
      log.debug('Processing "%s".', file.originalPath);
      file.path = file.originalPath.replace(/\.json$/, '.js');

      var actRule = JSON.parse(actRuleJson);
      var actRule = applyTestCases(actRule);
      var testContent = JSON.stringify(actRule, null, 2);
      var testFileContent = template.replace('{}; /*tests*/', testContent);

      done(null, testFileContent);
    } catch (e) {
      console.error(e);
      done(e, null);
    }
  };
}

module.exports = {
  'preprocessor:act': ['factory', createActPreprocessor]
};

function applyTestCases(actRule) {
  actRule = Object.assign({}, actRule);

  actRule.testcases = testcases.filter(function(testcase) {
    return testcase.ruleId === actRule.id;
  });
  actRule.testcases.forEach(function(testcase) {
    var testcasePath = path.resolve(actRepoDir, testcase.relativePath);
    testcase.html = fs.readFileSync(testcasePath, 'utf-8');
  });

  return actRule;
}
